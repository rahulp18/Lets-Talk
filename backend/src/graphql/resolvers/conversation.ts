import { GraphQLError } from 'graphql';
import { GraphQLContext } from '../../utils/types';

const resolvers = {
  //   Query: {},
  Mutation: {
    createConversation: async (
      _: any,
      args: { paritipantIds: Array<string>; context: GraphQLContext },
    ) => {
      try {
        console.log('Participants', args);
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
  },
};

export default resolvers;
