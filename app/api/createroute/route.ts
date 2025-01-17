import { NextRequest, NextResponse } from "next/server";
import { createRoute } from "./createroute";

export async function POST(req: NextRequest) {
  return await createRoute(req);
}
