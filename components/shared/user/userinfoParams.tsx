import { UserSession } from "@/types/next-auth";

interface Props {
  user: Omit<UserSession, "image" | "name"> | undefined | null;
}

export default function UserInfoParams({ user }: Props) {
  // console.log(user);
  if (!user) return <p>No user is logged in</p>;

  return (
    <div>
      <h1>
        Welcome! {user?.lastName} {user?.firstName} ({user?.role})
      </h1>
      <p>
        {" "}
        {user?.email} id-{user?.id}
      </p>
    </div>
  );
}
