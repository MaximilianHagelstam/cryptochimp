import prisma from '../lib/prisma';

export default async function Page() {
  const users = await prisma.user.findMany();

  return (
    <>
      <button className="btn-primary btn">Hello Team</button>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </>
  );
}
