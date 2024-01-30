import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }
  const { id, deliveryStatus } = await request.json();
  const order = await prisma.order.update({
    where: { id: id },
    data: {
      deliveryStatus,
    },
  });
  return NextResponse.json(order);
}
