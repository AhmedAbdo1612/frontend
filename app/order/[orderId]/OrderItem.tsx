"use client";

import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { CartProductType } from "@prisma/client";
import Image from "next/image";

interface OrderitemProps {
  order: CartProductType;
}
const OrderItem: React.FC<OrderitemProps> = ({ order }) => {
  return (
    <div
      className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1/5px]
     border-slate-400 py-4 items-center"
    >
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <div className="relative w-[70px] aspect-square">
          <Image
            src={order.selectedImg.image}
            alt={order.name}
            fill
            className="object-contain "
          />
        </div>

        <div className="flex flex-col gap-1">
          <div>{truncateText(order.name)}</div>
          <div>{order.selectedImg.color}</div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(order.price)}</div>
      <div className="justify-self-center">{order.quantity}</div>
      <div className="justify-self-end font-semibold">
        {(order.quantity * order.price).toFixed(2)}
      </div>
    </div>
  );
};
export default OrderItem;
