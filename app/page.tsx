import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth/next";

export default async function Home() {
  const session = await getServerSession(authConfig);

  // console.log("session ---", session);

  if (!session) {
    return <p>User is not logged in</p>;
  }

  return (
    <div>
      <main>
        Welcome to NextJS world
        <div>
          <h1>Welcome, {session.user.firstName}!</h1>
          <p>Email: {session.user.email}</p>
          <p>Role: {session.user.role}</p>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
