import { cn } from "@/lib/utils";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { AiTwotoneMail } from "react-icons/ai";
import FormError from "./formError";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

interface FormValues {
  email: string;
}
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
        onClick={() => signIn("github", { callbackUrl })}
      >
        Sign in with Github
      </button>
    </div>
  );
}
