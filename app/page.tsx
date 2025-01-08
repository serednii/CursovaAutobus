import { getSession } from "next-auth/react";

export default async function Home() {
  const session = await getSession();
  console.log("session ---", session);
  if (!session) {
    return <p>User is not logged in</p>;
  }

  return (
    <div className="">
      <main className="">
        Welcome to NextJS world
        <div>
          <h1>Welcome, {session.user.firstName}!</h1>
          <p>Email: {session.user.email}</p>
          <p>Role: {session.user.role}</p>
        </div>
      </main>
      <footer className=""></footer>
    </div>
  );
}
