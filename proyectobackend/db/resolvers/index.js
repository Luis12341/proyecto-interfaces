const clienteResolvers = require("./clienteResolver");
const pedidoResolver = require("./pedidoResolver");
const productoResolver = require("./productoResolver");
const usuarioResolver = require("./usuarioResolver");

const resolvers = [
    clienteResolvers,
    pedidoResolver,
    productoResolver,
    usuarioResolver,
];

module.exports = resolvers;
