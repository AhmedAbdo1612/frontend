"use client";

import Button from "@/app/components/Button/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/Inputs/CategoryInput";
import CustomCheckBox from "@/app/components/Inputs/CustomCheckBox";
import Input from "@/app/components/Inputs/Inputs";
import SelectColor from "@/app/components/Inputs/SelectColor";
import TextArea from "@/app/components/Inputs/TextArea";
import firebaseApp from "@/libs/firebase";
import { categories } from "@/utils/Categories";
import { colors } from "@/utils/colors";
import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { DotLoader, ScaleLoader } from "react-spinners";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};

export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

const AddProductForm = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>(null);
  const [isProductCreated, setIsProductCreated] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      category: "",
      inStock: false,
      images: [],
      price: "",
    },
  });
  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);
  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated]);
  const category = watch("category");
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }
      return [...prev, value];
    });
  }, []);
  const removeImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter((item) => item.color == value.color);
        return filteredImages;
      }
      return prev;
    });
  }, []);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    let uploadedImages: UploadedImageType[] = [];
    if (!data.category) {
      setLoading(false);
      return toast.error("Category is not selected!");
    }
    if (!data.images || data.length === 0) {
      setLoading(false);
      return toast.error("No selected images!");
    }
    const handleImageUploads = async () => {
      toast("Creating product, please wait.....");
      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + "-" + item.image.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);
            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {},
                (error: any) => {
                  console.log("Error in Uploading Image");
                  reject(error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadUrl) => {
                      uploadedImages.push({
                        ...item,
                        image: downloadUrl,
                      });
                      resolve();
                    })
                    .catch((err) => {
                      reject(err);
                    });
                }
              );
            });
          }
        }
      } catch (error) {
        setLoading(false);
        return toast.error("Error in images upload");
      }
    };
    await handleImageUploads();
    const productData = { ...data, images: uploadedImages };
    axios
      .post("/api/product", productData)
      .then(() => {
        toast.success("Product Created");
        setIsProductCreated(true);
        router.refresh();
      })
      .catch((err) => {
        console.log(err)
        toast.error("Something went wrong in saving the product");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <Heading title="Add a Product" center />
      <Input
        id="name"
        label="Name"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="price"
        label="Price"
        disabled={loading}
        register={register}
        errors={errors}
        required
        type="number"
      />

      <Input
        id="brand"
        label="Brand"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id="description"
        label="Description"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <CustomCheckBox
        id="inStock"
        register={register}
        label="This product is in stock "
      />
      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Select a Category</div>
        <div
          className="grid grid-cols-2 md:grid-cols-3 
        max-h-[50vh] overflow-y-auto gap-3"
        >
          {categories.map((item) => {
            if (item.label === "All") {
              return null;
            }
            return (
              <div key={item.label} className="col-span-1">
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex flex-col flex-wrap gap-4">
        <div>
          <div className="font-bold">
            Select the available product colors and upload thier images
          </div>
          <div className="text-sm">
            You must select an image for each color you select otherwise your
            color selection will be ignored.
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {colors.map((item, index) => {
            return (
              <SelectColor
                key={index}
                item={item}
                addImageToState={addImageToState}
                removeImageFromState={removeImageToState}
                isProductCreated={isProductCreated}
              />
            );
          })}
        </div>
      </div>
      {loading ? (
        <div className="text-slate-500">
          <ScaleLoader />
        </div>
      ) : (
        <Button label="Add Product" onClick={handleSubmit(onSubmit)} />
      )}
    </>
  );
};
export default AddProductForm;
