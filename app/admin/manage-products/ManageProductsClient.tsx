"use client";

import { Product } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";

import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdOutlineManageHistory,
  MdRemoveRedEye,
} from "react-icons/md";
import Status from "@/app/components/Status";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/libs/firebase";

interface ManageProductsClientProps {
  products: Product[];
}
const ManageProductsClient: React.FC<ManageProductsClientProps> = ({
  products,
}) => {
  const router = useRouter();
  const storage = getStorage(firebaseApp);
  let rows: any = [];
  if (products) {
    rows = products.map((item) => ({
      id: item.id,
      name: item.name,
      price: formatPrice(item.price),
      category: item.category,
      brand: item.brand,
      inStock: item.inStock,
      images: item.images,
    }));
  }
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Name", width: 220 },
    {
      field: "price",
      headerName: "Price(USD)",
      width: 100,
      renderCell: (params) => (
        <div className="font-bold text-slate-800">{params.row.price}</div>
      ),
    },
    { field: "category", headerName: "Category", width: 100 },
    { field: "brand", headerName: "Brand", width: 100 },
    {
      field: "inStock",
      headerName: "inStock",
      width: 120,
      renderCell: (params) => (
        <div className="w-full">
          {params.row.inStock === true ? (
            <Status
              text="in stock"
              icon={MdDone}
              bg="bg-teal-300"
              color="text-teal-700"
            />
          ) : (
            <Status
              text="out of stock"
              icon={MdClose}
              bg="bg-rose-300"
              color="text-rose-700"
            />
          )}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="flex justify-between gap-4 w-full">
          <ActionBtn
            icon={MdCached}
            onClick={() => {
              handleToggleStock(params.row.id, params.row.inStock);
            }}
          />
          <ActionBtn
            icon={MdDelete}
            custom="transition hover:bg-rose-600 hover:text-white"
            onClick={() => {
              handleDelete(params.row.id, params.row.images);
            }}
          />
          <ActionBtn
            icon={MdRemoveRedEye}
            custom="hover:bg-green-500 hover:text-white hover:font-semibold"
            onClick={() => {
              router.push(`/product/${params.row.id}`);
            }}
          />
        </div>
      ),
    },
  ];
  const handleToggleStock = useCallback((id: string, inStock: boolean) => {
    axios
      .put("/api/product", {
        id,
        inStock: !inStock,
      })
      .then((res) => {
        toast.success("Product status changed");
        router.refresh();
      })
      .catch((err: any) => {
        toast.error("Ooops! something went wrong");
        console.log(err);
      });
  }, []);
  const handleDelete = useCallback(async (id: string, images: any[]) => {
    toast("Deletin product, please wait");
    const handleImageDelete = async () => {
      try {
        for (const item of images) {
          if (item.image) {
            const imageRef = ref(storage, item.image);
            await deleteObject(imageRef);
            console.log("Image Deleted", item.image);
          }
        }
      } catch (error) {
        return console.log("Deleting images error", error);
      }
    };
    await handleImageDelete();
    axios
      .delete(`/api/product/${id}`)
      .then((res) => {
        toast.success("Product Deleted Successfully!");
        router.refresh();
      })
      .catch((err: any) => {
        toast.error("Failed to delete product");
        console.log(err);
      });
  }, []);
  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8 flex items-center gap-2 justify-center">
        <Heading title="Manage Products" center />
        <MdOutlineManageHistory size={32} />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[9, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};
export default ManageProductsClient;
