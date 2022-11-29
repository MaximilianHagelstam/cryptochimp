import type { User } from '@prisma/client';
import useSWR from 'swr';

export default function Home() {
  const { data } = useSWR<User[]>('/api', (url) =>
    fetch(url).then((res) => res.json())
  );
  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button className="btn-primary btn">Hello Team</button>
    </>
  );
}
