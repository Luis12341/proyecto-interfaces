const clienteSchema = require("./clienteSchema");
const pedidoSchema = require("./pedidoSchema");
const productoSchema = require("./productoSchema");
const usuarioSchema = require("./usuarioSchema");

const typeDefs = [clienteSchema, pedidoSchema, productoSchema, usuarioSchema];

module.exports = typeDefs;
