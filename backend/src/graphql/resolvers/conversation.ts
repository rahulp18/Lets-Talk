import { GraphQLError } from 'graphql';
import { GraphQLContext } from '../../utils/types';
import { Prisma } from '@prisma/client';

const resolvers = {
  Query: {
    conversations: async function getConverSations(
      _: any,
      args: Record<string, never>,
      context: GraphQLContext,
    ): Promise<Array<any>> {
      const { session, prisma } = context;
      if (!session?.user) {
        throw new GraphQLError('Not authorized');
      }
      try {
        const { id } = session.user;
        const conversations = await prisma.conversation.findMany({
          include: conversationPopulated,
        });
        return conversations.filter(
          conversation =>
            !!conversation.participants.find(p => p.userId === id),
        );
      } catch (error) {
        console.log('error', error);
        throw new GraphQLError(error?.message);
      }
    },
  },
  Mutation: {
    createConversation: async function (
      _: any,
      args: { participantIds: Array<string> },
      context: GraphQLContext,
    ): Promise<{ conversationId: string }> {
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
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
  },
};

export const participantPopulated =
  Prisma.validator<Prisma.ConversationParticipantInclude>()({
    user: {
      select: {
        id: true,
        username: true,
      },
    },
  });

export const conversationPopulated =
  Prisma.validator<Prisma.ConversationInclude>()({
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
