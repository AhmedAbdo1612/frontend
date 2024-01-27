"use client";

import { Product } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";
import { MdClose, MdDone, MdOutlineManageHistory } from "react-icons/md";
import Status from "@/app/components/Status";

interface ManageProductsClientProps {
  products: Product[];
}
const ManageProductsClient: React.FC<ManageProductsClientProps> = ({
  products,
}) => {
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
        <div className='w-full'>
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
      renderCell: (params) => <div>Actions</div>,
    },
  ];
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
        />
      </div>
    </div>
  );
};
export default ManageProductsClient;
