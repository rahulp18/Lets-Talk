const typeDefs = `#graphql
type User{
  id:String
  username:String
}

type Query{
    searchUsers(username:String!):[User]
}

type Mutation{
    createUsername(username:String!):CreateUserResponse
}
type CreateUserResponse{
    success:Boolean
    error:String
}
 
`;
export default typeDefs;
