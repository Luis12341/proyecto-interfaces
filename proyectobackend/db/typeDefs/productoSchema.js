const { gql } = require("apollo-server");

// Schema
const typeDefs = gql`

    type Producto {
        id: ID
        nombre: String
        existencia: Int
        precio: Float
        creado: String
    }
    
    input ProductoInput {
        nombre: String!
        existencia: Int!
        precio: Float!
    }

    extend type Query {
        obtenerProductos: [Producto]
        obtenerProducto(id: ID!): Producto
    }

    extend type Mutation {
        nuevoProducto(input: ProductoInput): Producto
        actualizarProducto(id: ID!, input: ProductoInput): Producto
        eliminarProducto(id: ID!): String
    }
`;

module.exports = typeDefs;
