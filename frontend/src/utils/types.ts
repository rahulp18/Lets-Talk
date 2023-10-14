export interface SearchUsersInput {
  username: string;
}
export interface SearchUsersData {
  searchUsers: Array<SearchedUser>;
}

export interface SearchedUser {
  id: string;
  username: string;
}

// Conversations

export interface CreateConversationData {
  createConversation: {
    conversationId: string;
  };
}
export interface CreateConversationInput {
  participantIds: Array<string>;
}
