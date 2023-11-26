'use client';
import React, { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import SearchModal from './SearchModal';
import { useQuery } from '@apollo/client';
import conversation from '@/graphql/operations/conversation';
const Sidebar = () => {
  const [isOpemModal, setIsOpemModal] = useState(false);
  const { data, loading } = useQuery(conversation.Queries.Conversations);
  const onClose = () => {
    setIsOpemModal(false);
  };

  return (
    <div>
      <div
        onClick={() => setIsOpemModal(true)}
        className="w-full px-3 cursor-pointer flex justify-between items-center py-2 transition-opacity ease-linear duration-250 bg-secondary rounded-md border border-secondary"
      >
        <p className="text-gray-400">Search for users</p>
        <BiSearchAlt size={18} className="text-gray-400" />
      </div>
      {isOpemModal && <SearchModal isOpen={isOpemModal} onClose={onClose} />}
      {/* Showing conversations */}
      <div className="mt-5">
        {loading && <h1>Loading....</h1>}
        {data?.conversations &&
          data?.conversations.map((item: any) => (
            <div key={item.id} className="">
              {item.id}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
