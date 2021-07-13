const Cliente = require("../../models/Cliente");
const Pedido = require("../../models/Pedido");

const resolvers = {
    Query: {
        obtenerClientes: async () => {
            try {
                const clientes = await Cliente.find({});
                return clientes;
            } catch (error) {
                console.log(error);
            }
        },
        obtenerClientesVendedor: async (_, {}, ctx) => {
            try {
                const clientes = await Cliente.find({
                    vendedor: ctx.usuario.id.toString(),
                });
                return clientes;
            } catch (error) {
                console.log(error);
            }
        },
        obtenerCliente: async (_, { id }, ctx) => {
            const cliente = await Cliente.findById(id);

            if (!cliente) {
                throw new Error("Cliente no encontrado");
            }

            return cliente;
        },
    },
    Mutation: {
        nuevoCliente: async (_, { input }, ctx) => {
            console.log(ctx);

            const { cedula } = input;

            const cliente = await Cliente.findOne({ cedula });
            if (cliente) {
                throw new Error("Ese cliente ya esta registrado");
            }

            const nuevoCliente = new Cliente(input);

            nuevoCliente.vendedor = ctx.usuario.id;


            try {
                const resultado = await nuevoCliente.save();
                return resultado;
            } catch (error) {
                console.log(error);
            }
        },
        actualizarCliente: async (_, { id, input }) => {
            let cliente = await Cliente.findById(id);

            if (!cliente) {
                throw new Error("Ese cliente no existe");
            }

            cliente = await Cliente.findOneAndUpdate({ _id: id }, input, {
                new: true,
            });
            return cliente;
        },
        eliminarCliente: async (_, { id }, ctx) => {
            let cliente = await Cliente.findById(id);

            if (!cliente) {
                throw new Error("Ese cliente no existe");
            }

            const pedidos = await Pedido.find({cliente: id})
            console.log(pedidos.length === 0)
            if(!(pedidos.length === 0)){
                throw new Error("El cliente no se puede Eliminar, tiene pedidos registrados");
            }

            await Cliente.findOneAndDelete({ _id: id });
            return "Cliente Eliminado";
        },
    },
};

module.exports = resolvers;
