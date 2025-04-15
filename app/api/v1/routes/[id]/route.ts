import { NextRequest, NextResponse } from "next/server";

import { updateRoute } from "../updateRoute";

// API route handler for updating a route
export async function PATCH(req: NextRequest, { params }: { params: { id?: string } }) {
  const { id } = await params;
  // const { searchParams } = new URL(req.url);
  // const id = searchParams.get("id");
  const numberId = parseInt(id || "0", 10);

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  return await updateRoute(req, numberId);
}
