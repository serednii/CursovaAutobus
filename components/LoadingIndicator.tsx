"use client";

import { CircularProgress } from "@mui/material";

export default function LoadingIndicator() {
  return <CircularProgress className="absolute top-5 left-1/2 color-[#94f07c] z-10" size={30} />;
}
