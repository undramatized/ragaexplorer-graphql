import { ApolloServer, gql } from 'apollo-server';
import { RagaAPI } from './datasource';

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  type Raga {
    id: Int!
    format_name: String!
    name: String!
    melakarta: Int
    arohanam: String!
    avarohanam: String!
  }

  type Chord {
    title: String
    author: String
  }

  # The "Query" type is the root of all GraphQL queries.
  type Query {
    ragas: [Raga]
    raga(id: Int!): Raga
  }
`;

// Resolvers define the technique for fetching the types in the schema.
const resolvers = {
  Query: {
    ragas: (root, args, { dataSources }) => dataSources.ragaAPI.getAllRagas(),
    raga: (root, { id }, { dataSources }) => dataSources.ragaAPI.getRagaById(id),
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ragaAPI: new RagaAPI(),
  })
 });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
