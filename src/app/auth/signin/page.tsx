import { SignInButton } from "@/components/SigninButton";
import { getCurrentUser } from "@/lib/auth";
import { Card } from "@tremor/react";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex h-screen w-full items-center justify-center px-6">
      <Card className="flex max-w-xl flex-col items-center justify-center gap-6">
        <h1 className="text-center text-3xl font-bold">Login</h1>
        <SignInButton size="xl" />
      </Card>
    </main>
  );
}
