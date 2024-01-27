"use client";

import { Product } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";

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
        <div className={`${params.row.inStock ? "bg-blue-600" : ""}`}>
          {params.row.inStock === true ? "in stock" : "out of stock"}
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
    <div>
      <div className="mb-4 mt-8">
        <Heading title="Manage Products" center />
      </div>
      <div style={{height:600, width:'100%'}}>
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
