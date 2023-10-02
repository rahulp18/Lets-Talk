'use client';
import { useLazyQuery } from '@apollo/client';
import React, { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { SlClose } from 'react-icons/sl';
import UserOperations from '../graphql/operations/users';
import { SearchUsersData, SearchUsersInput } from '@/utils/types';
interface SearchModalProps {
  onClose: () => void;
  isOpen: boolean;
}
const SearchModal: React.FC<SearchModalProps> = ({ onClose, isOpen }) => {
  const [searchUsername, setSearchUsername] = useState('');
  const [searchUsers, { data, loading, error }] = useLazyQuery<
    SearchUsersData,
    SearchUsersInput
  >(UserOperations.Queries.searchUsers);

  const handleOnchange = (e: any) => {
    try {
      setSearchUsername(e.target.value);
      searchUsers({ variables: { username: e.target.value } });
    } catch (error) {
      console.log(error);
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
            {loading ? (
              <h1>Please wait</h1>
            ) : data?.searchUsers.length === 0 ? (
              <h1>No user found</h1>
            ) : searchUsername && data && data?.searchUsers.length > 0 ? (
              <div className=" absolute top-12 w-full max-h-[300px] overflow-y-auto scroll  mt-5 flex flex-col gap-1">
                {data.searchUsers?.map(item => (
                  <h1
                    className="bg-cyan rounded-md p-2 drop-shadow-sm"
                    key={item.id}
                  >
                    {item.username}
                  </h1>
                ))}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
