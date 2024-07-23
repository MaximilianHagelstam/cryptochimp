import { getCurrentUser } from "@/lib/auth";
import { Bold, Card, TextInput, Title } from "@tremor/react";

export default async function Settings() {
  const user = await getCurrentUser();

  return (
    <Card className="flex w-full justify-center py-12">
      <div className="flex w-full max-w-xl flex-col justify-center gap-6">
        <Title>Account settings</Title>
        <div className="flex flex-col gap-4">
          <div>
            <Bold className="font-medium">Username</Bold>
            <TextInput disabled className="mt-2" value={user?.name ?? ""} />
          </div>
          <div>
            <Bold className="font-medium">Email</Bold>
            <TextInput disabled className="mt-2" value={user?.email ?? ""} />
          </div>
        </div>
      </div>
    </Card>
  );
}
