import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function useFindRouteSession() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const sessionIdUser = Number(session?.user?.id);

  const [idRoute, setIdRoute] = useState<string | null>(null);
  const [transition, setTransition] = useState<string | null>(null);

  useEffect(() => {
    const routeId = sessionStorage.getItem("idRoute");
    const trans = sessionStorage.getItem("transition");
    setIdRoute(routeId);
    setTransition(trans);
  }, []);

  useEffect(() => {
    if (idRoute && transition === "seatselection" && status === "authenticated") {
      sessionStorage.removeItem("idRoute");
      sessionStorage.removeItem("transition");
      router.push(`/seatselection/${idRoute}`);
    }
  }, [idRoute, transition, status, router]);

  return { sessionIdUser, status };
}
