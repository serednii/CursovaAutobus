import FindRoute from "@/components/shared/findroute/FindRoute";

export default function Home() {
  return (
    <div className="pt-[45px] px-0 bg-[#F9FAFB] font-bold text-3xl">
      <h1 className="px-4 mb-[30px]">Find Your Route</h1>
      <FindRoute className="p-6" />
    </div>
  );
}
