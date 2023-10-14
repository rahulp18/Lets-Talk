import { GraphQLError } from 'graphql';
const resolvers = {
    //   Query: {},
    Mutation: {
        createConversation: async (_, args) => {
            try {
                console.log('Participants', args);
            }
            catch (error) {
                throw new GraphQLError(error);
            }
        },
    },
};
export default resolvers;
