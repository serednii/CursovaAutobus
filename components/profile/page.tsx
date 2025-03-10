import Image from "next/image";
import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth/next";

export default async function Profile() {
  const session = await getServerSession(authConfig);

  return (
    <div>
      <h1>Profile of {session?.user?.name}</h1>
      {session?.user?.image && (
        <Image
          src={session.user.image}
          alt="User photo"
          width={100} // або інша відповідна ширина
          height={100} // або інша відповідна висота
          priority // пришвидшує завантаження важливих зображень
        />
      )}
    </div>
  );
}
