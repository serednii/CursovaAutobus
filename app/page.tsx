import { Container } from "@/components/shared/Container";
import FindRoute from "@/components/shared/findroute/FindRoute";
import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth/next";

export default async function Home() {
  const session = await getServerSession(authConfig);

  // console.log("session ---", session);

  // if (!session) {
  //   return (
  //     <Container className=" w-full px-0">
  //       <div className="bg-[url(/images/img@2x.jpg)] bg-cover w-full h-full">
  //         <h1>Find Your Route</h1>
  //       </div>
  //     </Container>
  //   );
  // }

  return (
    <Container className="max-w-[1100px] pt-[45px] px-0">
      <div className="font-bold text-3xl">
        <h1 className="mb-[30px]">Find Your Route</h1>
        <FindRoute className="p-6" />
      </div>
    </Container>
  );
}
