import ProtectedPage from '@/components/ProtectedPage';

import React from 'react';

const HomePage = async ({ searchParams }: { searchParams: string }) => {
  const { conversationId } = searchParams;

  return (
    <ProtectedPage>
      <div className="">
        {conversationId ? conversationId : <div>No conversation id</div>}
      </div>
    </ProtectedPage>
  );
};

export default HomePage;
