import { getCurrentUser } from "@/actions/getCurrentUser"
import Container from "@/app/components/Container"
import NullData from "@/app/components/NullData"
import ManageOrderssClient from "./ManageOrdersClient"
import getOrders from "@/actions/getOrders"

const ManageProducts = async()=>{
    const orders:any = await getOrders()
    const currentUser = await getCurrentUser()
    if(!currentUser || currentUser.role !== "ADMIN"){
        return <NullData title="Ooops Access Denied!"/>
    }
    return (
        <div className="pt-8">
            <Container>
               <ManageOrderssClient orders={orders}/>
            </Container>
        </div>
    )
}
export default ManageProducts