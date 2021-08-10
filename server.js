const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

//fake data
const authors = [
    {
    id: "1",
    info: {
        name: "John Doe",
        age: 30,
        gender: "M",
    }
},
    {
    id: "2",
    info: {
        name: "Ama Doe",
        age: 30,
        gender: "F",
    }
}
];

//GraphQL schema in string form
const typeDefs = `
    type Author {
        id: ID!
        info: Person 
    }
    type Person {
        name: String!
        age: Int
        gender: String
    }
    type Query {
        getAuthors: [Author]
        retrieveAuthor(id: ID!): Author
    }

`;

//the resolvers
const resolvers = {
    Query: {
        getAuthors: () => authors,
        retrieveAuthor: (obj, { id }) => {
            authors.find(author => author.id === id);
    }
}
}

const PORT = 8080;

//Put together the schema and resolvers
async function startApolloServer(typeDefs, resolvers){
    const server = new ApolloServer({typeDefs, resolvers})
    const app = express();
    await server.start();
    server.applyMiddleware({app, path: '/graphql'});
    
    app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}${server.graphqlPath}`);
})
}

startApolloServer(typeDefs, resolvers);
