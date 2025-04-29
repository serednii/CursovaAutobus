// import { IGetSearchRouteCityOption } from "@/fetchApi/v1/getRoutes";
// import { middleware } from "@/middleware";
import { prisma } from "@/prisma/prisma-client";
// import { UserSelect } from "@/types/next-auth";
import { NextRequest, NextResponse } from "next/server";
import { checkApiKey, parseStringRoutesToObject } from "../util";

export async function GET(req: NextRequest) {
  // console.log("getUniqueRoutes", req);
  try {
    // const middlewareResponse = await middleware(req);

    // if (middlewareResponse.status !== 200) {
    //   return middlewareResponse;
    // }
    const isApiKeyValid = checkApiKey(req);
    if (!isApiKeyValid) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const selectParams = searchParams.get("select") || "";

    const select = parseStringRoutesToObject(selectParams);
    // Отримуємо дані з тіла запиту
    // const {
    //   select,
    // }: {
    //   select: IGetSearchRouteCityOption;
    // } = await req.json();

    console.log("getUniqueRoutes search select", select);

    const routes = await prisma.routeDriver.findMany({
      // where,
      take: 100,
      select,
      distinct: ["departureFrom", "arrivalTo"],
    });

    // console.log("routes****************", routes);

    const safeRoutes = Array.isArray(routes) ? routes : []; // Гарантуємо, що це масив

    return NextResponse.json(safeRoutes);
  } catch (error) {
    console.error("Помилка обробки запиту:", error);
    return NextResponse.json({ error: "Не вдалося обробити запит" }, { status: 500 });
  }
}

// {departureFrom: 'Houston', arrivalTo: 'San Antonio'}
// {departureFrom: 'Miami', arrivalTo: 'Orlando'}
// {departureFrom: 'Chicago', arrivalTo: 'Detroit'}
// {departureFrom: 'Los Angeles', arrivalTo: 'San Francisco'}
// {departureFrom: 'Seattle', arrivalTo: 'Portland'}
// {departureFrom: 'Austin', arrivalTo: 'Dallas'}
// {departureFrom: 'Houston', arrivalTo: 'San Antonio'}
// {departureFrom: 'New York', arrivalTo: 'Overland Park'}
// {departureFrom: 'New York', arrivalTo: 'Memphis'}
// {departureFrom: 'Paris', arrivalTo: 'London'}
// {departureFrom: 'New York', arrivalTo: 'Oakland'}
// {departureFrom: 'New York', arrivalTo: 'Madison'}
// {departureFrom: 'New York', arrivalTo: 'London'}
// {departureFrom: 'Macon', arrivalTo: 'Omaha'}
