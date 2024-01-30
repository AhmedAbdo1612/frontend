"use client";
import Button from "@/app/components/Button/Button";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/Inputs/Inputs";
import { SafeUser } from "@/types";
import { Rating } from "@mui/material";
import { Order, Product, Review } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MoonLoader } from "react-spinners";

interface AddRatingProps {
  product: Product & {
    reviews: Review[];
  };
  user:
    | (SafeUser & {
        orders: Order[];
      })
    | null;
}

const AddRating: React.FC<AddRatingProps> = ({ product, user }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    if (data.rating === 0) {
      setLoading(false);
      return toast.error("No rating selected");
    }
    const ratingData = { ...data, userId: user?.id, product: product };
    axios
      .post("/api/rating", ratingData)
      .then((res) => {
        toast.success("Rating Submitted");
        router.refresh();
        reset();
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  if (!user || !product) return null;
  const deliveredOrders = user.orders.filter(
    (item) => item.id === product.id && item.deliveryStatus === "delivered"
  );
  const userReview = product?.reviews.find(
    (review: Review) => review.userId === user.id
  );
  if (userReview || !deliveredOrders) {
    return null;
  }
  return (
    <div className="flex flex-col gap-2 max-w-[500px]">
      <Heading title="Rate This Product" />
      <Rating
        onChange={(event, newValue) => {
          setCustomValue("rating", newValue);
        }}
      />
      <Input
        id="comment"
        label="Comment"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <div className=" w-full flex justify-center">
        {loading ? (
        <MoonLoader color="#2b2a2d" size={30}/>
        ) : (
          <div className="w-full">
            <Button
              label={loading ? "Loading" : "Rate Product"}
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default AddRating;
