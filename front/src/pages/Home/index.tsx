import { FormEvent, useEffect, useState } from 'react';
import Button from '~/components/Button';
import Tabs from '~/components/Tabs';
import getStatsUser from '~/services/Stats';
import UserType from '~/types/UserType';

export default function Home() {
  const [userName, setUsername] = useState('AlemaoRetroGame');
  const [isLoading, setIsLoading] = useState(false);
  const [userSelected, setUserSelected] = useState<UserType | null>(null);

  useEffect(() => console.log(userSelected), [userSelected]);

  async function load() {
    setIsLoading(true);
    const result = await getStatsUser(userName);
    setUserSelected(result);
    setIsLoading(false);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    load();
  }

  return (
    <>
      <form className="w-full max-w-sm flex m-2 gap-1" onSubmit={handleSubmit}>
        <input
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          type="text"
          data-testid="inputNewItem"
          placeholder="Username"
          value={userName}
          onChange={e => setUsername(e.target.value)}
        />
        <Button isLoading={isLoading} disabled={isLoading} type="submit">
          Pesquisar
        </Button>
      </form>
      <Tabs infos={userSelected} />
    </>
  );
}
