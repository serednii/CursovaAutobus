import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

interface Props {
  className?: string;
}

export default function GitHubButton({ className }: Props) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <div className={cn("mb-4 relative", className)}>
      <button
        type="button"
        className={`mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        onClick={() => signIn("google", { callbackUrl })}
      >
        Sign in with Google
      </button>
    </div>
  );
}
