"use client";

import { Order, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";

import {
  MdAccessTimeFilled,
  MdDeliveryDining,
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
import moment from "moment";

interface OrdersClientProps {
  orders: ExtendedOrder[];
}
type ExtendedOrder = Order & {
  user: User;
};
const OrderssClient: React.FC<OrdersClientProps> = ({ orders }) => {
  const router = useRouter();
  let rows: any = [];
  if (orders) {
    rows = orders.map((item) => ({
      id: item.id,
      customer: item.user.name,
      amount: formatPrice(item.amount / 100),
      paymentStatus: item.status,
      date: moment(item.createDat).fromNow(),
      deliveryStatus: item.deliveryStatus,
    }));
  }
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "customer", headerName: "Customer Name", width: 130 },
    {
      field: "amount",
      headerName: "Amount(USD)",
      width: 130,
      renderCell: (params) => (
        <div className="font-bold text-slate-800">{params.row.amount}</div>
      ),
    },

    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 130,
      renderCell: (params) => (
        <div className="w-full">
          {params.row.paymentStatus === "pending" ? (
            <Status
              text="pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-300"
              color="text-slate-700"
            />
          ) : params.row.paymentStatus === "completed" ? (
            <Status
              text="completed"
              icon={MdDone}
              bg="bg-purple-300"
              color="text-purple-700"
            />
          ) : (
            <></>
          )}
        </div>
      ),
    },
    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      width: 130,
      renderCell: (params) => (
        <div className="w-full">
          {params.row.deliveryStatus === "pending" ? (
            <Status
              text="pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-300"
              color="text-slate-700"
            />
          ) : params.row.deliveryStatus === "dispatched" ? (
            <Status
              text="dispatched"
              icon={MdDeliveryDining}
              bg="bg-purple-300"
              color="text-purple-700"
            />
          ) : params.row.deliveryStatus === "delivered" ? (
            <Status
              text="delivered"
              icon={MdDone}
              bg="bg-green-300"
              color="text-green-700"
            />
          ) : (
            ""
          )}
        </div>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      width: 130,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="flex justify-between gap-4 w-full">
        
          <ActionBtn
            icon={MdRemoveRedEye}
            custom="hover:bg-green-500 hover:text-white hover:font-semibold"
            onClick={() => {
              router.push(`/order/${params.row.id}`);
            }}
          />
        </div>
      ),
    },
  ];
 

  

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8 flex items-center gap-2 justify-center">
        <Heading title="Manage Orders" center />
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
export default OrderssClient;
