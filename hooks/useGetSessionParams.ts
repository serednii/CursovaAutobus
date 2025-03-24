import { UserSession } from "@/types/next-auth";
import { useSession } from "next-auth/react";

export function useGetSessionParams() {
  const { data: session, status } = useSession();
  // const sessionUser: UserSession | null = session?.user || null;
  const sessionUser = status === "authenticated" ? (session?.user as UserSession) : null;
  const userSessionId = Number(session?.user?.id);
  return { session, userSessionId, status, sessionUser };
}
