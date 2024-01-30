import { getCurrentUser } from "@/actions/getCurrentUser"
import Container from "@/app/components/Container"
import NullData from "@/app/components/NullData"
import getOrdersByUserId from "@/actions/getOrdersByUserId"
import OrderClient from "./OrderClient"

const Orders = async()=>{
    
    const currentUser = await getCurrentUser()
    if(!currentUser ){
        return <NullData title="Ooops Access Denied!"/>
    }
    const orders = await getOrdersByUserId(currentUser.id)
    if(!orders ){
        return <NullData title="No orders yet"/>
    }
    return (
        <div className="pt-8">
            <Container>
               <OrderClient orders={orders}/>
            </Container>
        </div>
    )
}
export default Orders