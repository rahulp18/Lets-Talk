'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import GoogleButton from './GoogleButton';
import { useMutation } from '@apollo/client';
import UserOperations from '../graphql/operations/users';
import { useRouter } from 'next/navigation';
const UserForm = () => {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState('');
  const [createUsername, { loading: signInLoading }] = useMutation(
    UserOperations.Mutaions.createUsername,
  );
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(username);
    if (!username) {
      return;
    }
    // Call
    try {
      const { data } = await createUsername({
        variables: {
          username,
        },
      });
      console.log(data);
      router.push('/');
    } catch (error) {
      console.log(error);
    }

    setUsername('');
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (status === 'loading') {
      return;
    }
    setLoading(false);
    if (session?.user?.username) {
      router.push('/');
    }
  }, [session, status]);
  if (loading) {
    return <h1 className="">Loading...</h1>;
  }
  return (
    <div className="">
      {session?.user ? (
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex items-center justify-center gap-5 flex-col"
        >
          <div className="flex flex-col items-start justify-center gap-2">
            <label
              htmlFor="username"
              className="text-base cursor-pointer font-medium text-gray-600"
            >
              Username
            </label>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              type="text"
              id="username"
              name="username"
              className="w-full border border-gray-400 outline-sky-600 px-4 py-3 rounded-md"
              placeholder="Enter your username"
            />
          </div>

          <button className="px-4 py-2 w-full rounded-md drop-shadow-sm bg-sky-600 text-white ">
            {signInLoading ? 'Please wait...' : 'Create'}
          </button>
        </form>
      ) : (
        <GoogleButton />
      )}
    </div>
  );
};

export default UserForm;
