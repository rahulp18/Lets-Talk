import { GraphQLError } from 'graphql';
import { Prisma } from '@prisma/client';
const resolvers = {
    Query: {
        conversations: async function getConverSations(_, args, context) {
            const { session, prisma } = context;
            if (!session?.user) {
                throw new GraphQLError('Not authorized');
            }
            try {
                const { id } = session.user;
                const conversations = await prisma.conversation.findMany({
                    include: conversationPopulated,
                });
                return conversations.filter(conversation => !!conversation.participants.find(p => p.userId === id));
            }
            catch (error) {
                console.log('error', error);
                throw new GraphQLError(error?.message);
            }
        },
    },
    Mutation: {
        createConversation: async function (_, args, context) {
            const { participantIds } = args;
            try {
                const { session, prisma, pubsub } = context;
                // console.log('Session', session);
                if (!session?.user) {
                    throw new GraphQLError('Not authorized');
                }
                const { id: userId } = session.user;
                const conversation = await prisma.conversation.create({
                    data: {
                        participants: {
                            createMany: {
                                data: participantIds.map(id => ({
                                    userId: id,
                                    hasSeenLatestMessage: id === userId,
                                })),
                            },
                        },
                    },
                    include: conversationPopulated,
                });
                return {
                    conversationId: conversation.id,
                };
            }
            catch (error) {
                throw new GraphQLError(error);
            }
        },
    },
};
export const participantPopulated = Prisma.validator()({
    user: {
        select: {
            id: true,
            username: true,
        },
    },
});
export const conversationPopulated = Prisma.validator()({
    participants: {
        include: participantPopulated,
    },
    latestMessage: {
        include: {
            sender: {
                select: {
                    id: true,
                    username: true,
                },
            },
        },
    },
});
export default resolvers;
