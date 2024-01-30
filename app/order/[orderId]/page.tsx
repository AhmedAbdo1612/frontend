interface IParams {
  orderId?: string;
}
import NullData from "@/app/components/NullData";
import Container from "../../components/Container";
import OrderDetails from "./OrderDetails";
import getOrderById from "@/actions/getOrderById";

const Order = async ({ params }: { params: IParams }) => {
  const order = await getOrderById(params);
  if(!order){
    return <NullData title="No Order"/>
  }
  return (
    <div className="p-8">
      <Container>{order && <OrderDetails order={order} />}</Container>
    </div>
  );
};

export default Order;
