"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const GoogleButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/driver";

  return (
    <button onClick={() => signIn("github", { callbackUrl })}>
      Sign in with Github
    </button>
  );
};

export { GoogleButton };
