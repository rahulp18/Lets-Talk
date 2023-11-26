import { gql } from '@apollo/client';

export default {
  Queries: {
    Conversations: gql`
      query Query {
        conversations {
          id
          latestMessage {
            body
            createdAt
            id
            sender {
              id
              username
            }
          }
          updatedAt
          participants {
            id
            hasSeenLatestMessage
            user {
              id
              username
            }
          }
        }
      }
    `,
  },
  Mutations: {
    createConversation: gql`
      mutation Mutation($participantIds: [String]) {
        createConversation(participantIds: $participantIds) {
          conversationId
        }
      }
    `,
  },
};
