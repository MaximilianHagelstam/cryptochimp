import type { User } from '@prisma/client';
import useSWR from 'swr';

export default function Home() {
  const { data, error } = useSWR<User[]>('/api', (url) =>
    fetch(url).then((res) => res.json())
  );

  if (error) return <div>Error</div>;
  if (!data) return <div>Loading...</div>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
