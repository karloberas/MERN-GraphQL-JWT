import { buildSchema } from 'graphql';

export default buildSchema(`

type User {
    _id: ID!
    email: String!
    token: String!
}

input UserInput {
    email: String!
    password: String!
    confirm: String!
}

type rootQuery {
    login(email: String!, password: String!): User
    verifyToken(token: String!): User
}

type rootMutation {
    createUser(userInput: UserInput): User
}

schema {
    query: rootQuery
    mutation: rootMutation
}

`)