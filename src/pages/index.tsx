import { type NextPage } from "next";
import { useTranslation } from "../hooks/useTranslation";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { t } = useTranslation();

  const { data: examples } = trpc.example.getAll.useQuery();
  const { data } = trpc.example.hello.useQuery({ text: "team" });

  return (
    <>
      <h1 className="outline-2 outline-purple-100">{t.title}</h1>
      {examples?.map((example) => (
        <p key={example.id}>{example.id}</p>
      ))}
      <p>{data?.greeting}</p>
    </>
  );
};

export default Home;
