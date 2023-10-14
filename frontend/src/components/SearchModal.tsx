'use client';
import { useLazyQuery } from '@apollo/client';
import React, { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { SlClose } from 'react-icons/sl';
import UserOperations from '../graphql/operations/users';
import {
  CreateConversationData,
  CreateConversationInput,
  SearchUsersData,
  SearchUsersInput,
  SearchedUser,
} from '@/utils/types';
import Image from 'next/image';
import { useMutation } from '@apollo/client';
import { useSession } from 'next-auth/react';
import CreateConversations from '../graphql/operations/conversation';
interface SearchModalProps {
  onClose: () => void;
  isOpen: boolean;
}
const SearchModal: React.FC<SearchModalProps> = ({ onClose, isOpen }) => {
  const session = useSession();
  const [searchUsername, setSearchUsername] = useState('');
  const [searchUsers, { data, loading, error }] = useLazyQuery<
    SearchUsersData,
    SearchUsersInput
  >(UserOperations.Queries.searchUsers);
  const [participants, setParticipants] = useState<Array<SearchedUser>>([]);

  // Mutaions
  const [createConversation, { loading: createLoading }] = useMutation<
    CreateConversationData,
    CreateConversationInput
  >(CreateConversations.Mutations.createConversation);

  const addParticipant = (user: SearchedUser) => {
    setParticipants(prev => [...prev, user]);
  };
  const removeParticipant = (userId: string) => {
    setParticipants(prev => prev.filter(u => u.id !== userId));
  };
  const handleOnchange = (e: any) => {
    try {
      setSearchUsername(e.target.value);
      searchUsers({ variables: { username: e.target.value } });
    } catch (error) {
      console.log(error);
    }
  };
  const onCreateConversation = async () => {
    if (!session.data?.user) {
      return;
    }
    const paritipantIds = [
      session.data.user.id,
      ...participants.map(p => p.id),
    ];

    try {
      const { data } = await createConversation({
        variables: { participantIds: paritipantIds },
      });
      console.log('Here is Data', data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'}`}>
      <div className="w-full z-20 h-full flex justify-center items-start  bg-white/20">
        <div className="z-100 w-[500px] mt-10 bg-secondary p-8 rounded drop-shadow  ">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium ">Let's Build connections</h1>
            <button className="modal-close-btn" onClick={onClose}>
              <SlClose size={20} />
            </button>
          </div>

          <div className="mt-5 relative">
            <div className="w-full px-3 cursor-pointer flex justify-between text-black items-center py-2 transition-opacity ease-linear duration-250 bg-primary rounded-md border border-secondary">
              <input
                className="text-white p-2 outline-none  w-full h-full bg-transparent"
                type="text"
                placeholder="Search usernames"
                value={searchUsername}
                onChange={handleOnchange}
              />
              <BiSearchAlt size={18} className="text-gray-400" />
            </div>
            <div className="relative">
              {loading ? (
                <h1>Please wait</h1>
              ) : data?.searchUsers.length === 0 ? (
                <h1>No user found</h1>
              ) : searchUsername && data && data?.searchUsers.length > 0 ? (
                <div className="    w-full max-h-[300px] overflow-y-auto scroll drop-shadow-sm  mt-5 flex flex-col gap-1">
                  {data.searchUsers?.map(item => (
                    <div
                      key={item.id}
                      className="flex gap-2 w-full bg-cyan   px-4 py-2 rounded-md items-center"
                    >
                      <div className="h-10 w-10 rounded-full">
                        <Image
                          src="/user.png"
                          alt="user profile"
                          height={40}
                          width={40}
                          className="rounded-full object-contain w-full h-full"
                        />
                      </div>
                      <h1 className=" rounded-md   w-full">{item.username}</h1>
                      <button
                        disabled={
                          !!participants.find(
                            participant => participant.id === item.id,
                          )
                        }
                        onClick={() => addParticipant(item)}
                        className="bg-white text-black disabled:cursor-not-allowed disabled:bg-white/80 rounded-md px-2 py-1 text-sm"
                      >
                        Select
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="mt-5 flex flex-wrap gap-2 items-center justify-start ">
              {participants.length !== 0 &&
                participants.map((item, index) => (
                  <div
                    className="flex flex-col justify-start items-start gap-5"
                    key={index}
                  >
                    <div
                      key={index}
                      className="bg-primary flex items-center gap-2 px-4 py-2 rounded-md text-white"
                    >
                      <p className="text-sm"> {item.username}</p>
                      <SlClose
                        className="cursor-pointer"
                        onClick={() => removeParticipant(item.id)}
                      />
                    </div>
                    <button
                      onClick={onCreateConversation}
                      className="w-full bg-transparent text-white border border-white hover:bg-white hover:text-black transition-all ease-in duration-150 px-4 py-2 rounded-md"
                    >
                      Create conversation
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
