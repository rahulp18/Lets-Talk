import gql from 'graphql-tag';

const typeDefs = gql`
  scalar Date
  type Conversation {
    id: String
    latestMessage: Message
    participants: [Participant]
    updatedAt: Date
  }
  type Participant {
    id: String
    user: User
    hasSeenLatestMessage: Boolean
  }

  type ConversationDeleteResponse {
    id: String
  }
  type ConversationUpdatedSubsriptionPayload {
    conversation: Conversation
    addedUserIds: [String]
    removedUserIds: [String]
  }

  type Mutation {
    createConversation(participantIds: [String]): CreateConversationResponse
  }
  type CreateConversationResponse {
    conversationId: String
  }
  type Query {
    conversations: [Conversation]
  }
`;
export default typeDefs;
