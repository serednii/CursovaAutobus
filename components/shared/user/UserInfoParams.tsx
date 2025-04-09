import { cn } from "@/lib/utils";
import { UserSession } from "@/types/next-auth";

interface Props {
  user: Omit<UserSession, "image" | "name"> | undefined | null;
  className?: string;
}

export default function UserInfoParams({ user, className }: Props) {
  // console.log(user);
  if (!user) return <p>No user is logged in</p>;

  return (
    <div className={cn(className, "")}>
      <h1>
        {user?.lastName} {user?.firstName}
      </h1>
      <p>{user?.email}</p>
      {/* <p className="text-red-600">{user?.role.toUpperCase()}</p> */}
    </div>
  );
}
