import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { checkApiKey, parseStringRoutesToObject } from "@/app/api/v1/routes/util";
import { isAllowedField } from "@/lib/utils";
import { allowedFieldsDriver } from "../../const";

const limitEnv = process.env.NEXT_PUBLIC_DEFAULT_LIMIT || "100";

export async function GET(req: NextRequest) {
  try {
    const isApiKeyValid = checkApiKey(req);
    if (!isApiKeyValid) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const selectParams = searchParams.get("select") || "departureFrom,arrivalTo";
    const isAllowedFieldResult = isAllowedField(allowedFieldsDriver, selectParams);

    if (!isAllowedFieldResult) {
      return NextResponse.json({ error: "Invalid select" }, { status: 400 });
    }

    const select = parseStringRoutesToObject(selectParams);
    const limit = parseInt(searchParams.get("limit") || limitEnv, 10);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const offset = (page - 1) * limit;

    const whereCity = {
      departureDate: {
        gt: new Date(),
      },
    };

    const routes = await prisma.routeDriver.findMany({
      where: whereCity,
      take: limit,
      skip: offset,
      select,
      distinct: ["departureFrom", "arrivalTo"],
    });

    const total = await prisma.routeDriver.count({
      where: whereCity,
    });

    return NextResponse.json(
      {
        data: routes,
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Помилка обробки запиту:", error);
    return NextResponse.json({ error: "Не вдалося обробити запит" }, { status: 500 });
  }
}
//[
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
//]
