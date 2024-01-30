import prisma from "@/libs/prismadb";
import moment from "moment";

export default async function getGraphData() {
  try {
    const startDate = moment().subtract(6, "days").startOf("day");
    const endDate = moment().endOf("day");
    const result = await prisma.order.groupBy({
      by: ["createDat"],
      where: {
        createDat: {
          gte: startDate.toISOString(),
          lte: endDate.toISOString(),
        },
        status: "completed",
      },
      _sum: {
        amount: true,
      },
    });
    const aggregationData: {
      [day: string]: { day: string; date: string; totalAmount: number };
    } = {};
    const currentDate = startDate.clone();
    while (currentDate <= endDate) {
      const day = currentDate.format("dddd");
      console.log("day<<<<<<<<", day, currentDate);
      aggregationData[day] = {
        day,
        date: currentDate.format("YYYY-MM-DD"),
        totalAmount: 0,
      };
      currentDate.add(1, "day");
    }
    result.forEach((item) => {
      const day = moment(item.createDat).format("dddd");
      const amount = item._sum.amount || 0;
      aggregationData[day].totalAmount += amount;
    });
    const formattedData = Object.values(aggregationData).sort((a, b) =>
      moment(a.date).diff(moment(b.date))
    );
    return formattedData;
  } catch (error) {}
}
