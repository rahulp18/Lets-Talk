import userResolvers from './user';
import merge from 'lodash.merge';
import conversationResolvers from './conversation';
import messagesResolvers from './messages';
const resolvers = merge(
  {},
  userResolvers,
  conversationResolvers,
  messagesResolvers,
);

export default resolvers;
