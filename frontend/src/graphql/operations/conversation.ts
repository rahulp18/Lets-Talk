import { gql } from '@apollo/client';

export default {
  Queries: {},
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
