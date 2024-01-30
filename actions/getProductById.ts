import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
interface IParams{
    productId:string
}
export default async function getProductById({productId}:IParams){
    try {
        const product = await prisma.product.findUnique({
            where:{id:productId},
            include:{
                reviews:{
                    include:{user:true},
                    orderBy:{createdDate:"desc"}
                }

            }
        })
        if (!product){
            return null
        }
        return product
    } catch (error) {
        return null
    }
    

}