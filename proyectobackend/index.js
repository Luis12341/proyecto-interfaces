const { ApolloServer  } = require('apollo-server');
const typeDefs = require('./db/typeDefs');
const resolvers = require('./db/resolvers');
const conectarDB = require('./config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

conectarDB();

const server = new ApolloServer({
    typeDefs,
    resolvers, 
    context: ({req}) => {

        const token = req.headers['authorization'] || '';
        if(token) {
            try {
                const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETA );
                return {
                    usuario
                }
            } catch (error) {
                console.log('Hubo un error');
                console.log(error.message);
            }
        }
    }
});

server.listen({ port: process.env.PORT || 4000 }).then( ({url}) => {
    console.log(`Servidor iniciado en ${url}`)
} )