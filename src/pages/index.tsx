import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTranslation } from "../hooks/useTranslation";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { t } = useTranslation();
  const { data: sessionData } = useSession();

  const { data: examples } = trpc.example.getAll.useQuery();
  const { data } = trpc.example.hello.useQuery({ text: "team" });

  return (
    <>
      <h1>{t.title}</h1>
      {examples?.map((example) => (
        <p key={example.id}>{example.id}</p>
      ))}
      <p>{data?.greeting}</p>
      <p>{sessionData && <span>Welcome {sessionData.user?.name}</span>}</p>
      <button onClick={sessionData ? () => signOut() : () => signIn()}>
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </>
  );
};

export default Home;
