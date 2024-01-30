import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { Review } from "@prisma/client";

export async function POST(request: NextRequest) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();
  const { comment, rating, product, userId } = body;
  const deliveredOrders = currentUser.orders.filter(
    (item) => item.id === product.id && item.deliveryStatus === "delivered"
  );
  const userReview = product?.reviews.find((review:Review)=>(review.userId ===currentUser.id))
  if(userReview||!deliveredOrders){
    return NextResponse.error()
  }
  const review = await prisma?.review.create({
    data:{
        comment,rating,
        productId:product.id, userId
    }
  })
  return NextResponse.json(review)
}
