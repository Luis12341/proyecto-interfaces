const Pedido = require("../../models/Pedido");
const Cliente = require("../../models/Cliente");
const Producto = require("../../models/Producto");
const resolvers = {
    Query: {
        obtenerPedidos: async () => {
            try {
                const pedidos = await Pedido.find({});
                return pedidos;
            } catch (error) {
                console.log(error);
            }
        },
        obtenerPedidosVendedor: async (_, {}, ctx) => {
            try {
                const pedidos = await Pedido.find({
                    vendedor: ctx.usuario.id,
                }).populate("cliente");

                return pedidos;
            } catch (error) {
                console.log(error);
            }
        },
        obtenerPedido: async (_, { id }, ctx) => {
            const pedido = await Pedido.findById(id);
            if (!pedido) {
                throw new Error("Pedido no encontrado");
            }

            if (pedido.vendedor.toString() !== ctx.usuario.id) {
                throw new Error("No tienes las credenciales");
            }

            return pedido;
        },
        obtenerPedidosEstado: async (_, { estado }, ctx) => {
            const pedidos = await Pedido.find({
                vendedor: ctx.usuario.id,
                estado,
            });

            return pedidos;
        },
        mejoresClientes: async () => {
            const clientes = await Pedido.aggregate([
                { $match : { estado : "COMPLETADO" } },
                { $group : {
                    _id : "$cliente", 
                    total: { $sum: '$total' }
                }}, 
                {
                    $lookup: {
                        from: 'clientes', 
                        localField: '_id',
                        foreignField: "_id",
                        as: "cliente"
                    }
                }, 
                {
                    $limit: 10
                }, 
                {
                    $sort : { total : -1 }
                }
            ]);

            return clientes;
        }, 
        mejoresVendedores: async () => {
            const vendedores = await Pedido.aggregate([
                { $match : { estado : "COMPLETADO"} },
                { $group : {
                    _id : "$vendedor", 
                    total: {$sum: '$total'}
                }},
                {
                    $lookup: {
                        from: 'usuarios', 
                        localField: '_id',
                        foreignField: '_id',
                        as: 'vendedor'
                    }
                }, 
                {
                    $limit: 3
                }, 
                {
                    $sort: { total : -1 }
                }
            ]);

            return vendedores;
        }
    },
    Mutation: {
        nuevoPedido: async (_, { input }, ctx) => {
            const { cliente } = input;

            let clienteExiste = await Cliente.findById(cliente);

            if (!clienteExiste) {
                throw new Error("Ese cliente no existe");
            }


            for await (const articulo of input.pedido) {
                const { id } = articulo;

                const producto = await Producto.findById(id);

                if (articulo.cantidad > producto.existencia) {
                    throw new Error(
                        `El articulo: ${producto.nombre} excede la cantidad disponible`
                    );
                } else {
                    producto.existencia =
                        producto.existencia - articulo.cantidad;

                    await producto.save();
                }
            }

            const nuevoPedido = new Pedido(input);

            nuevoPedido.vendedor = ctx.usuario.id;

            const resultado = await nuevoPedido.save();
            return resultado;
        },
        actualizarPedido: async (_, { id, input }, ctx) => {
            const { cliente } = input;

            const existePedido = await Pedido.findById(id);
            if (!existePedido) {
                throw new Error("El pedido no existe");
            }

            const existeCliente = await Cliente.findById(cliente);
            if (!existeCliente) {
                throw new Error("El Cliente no existe");
            }

            if (existeCliente.vendedor.toString() !== ctx.usuario.id) {
                throw new Error("No tienes las credenciales");
            }

            if (input.pedido) {
                for await (const articulo of input.pedido) {
                    const { id } = articulo;

                    const producto = await Producto.findById(id);

                    if (articulo.cantidad > producto.existencia) {
                        throw new Error(
                            `El articulo: ${producto.nombre} excede la cantidad disponible`
                        );
                    } else {
                        producto.existencia =
                            producto.existencia - articulo.cantidad;

                        await producto.save();
                    }
                }
            }

            const resultado = await Pedido.findOneAndUpdate(
                { _id: id },
                input,
                { new: true }
            );
            return resultado;
        },
        eliminarPedido: async (_, { id }, ctx) => {
            const pedido = await Pedido.findById(id);
            if (!pedido) {
                throw new Error("El pedido no existe");
            }

            if (pedido.vendedor.toString() !== ctx.usuario.id) {
                throw new Error("No tienes las credenciales");
            }

            await Pedido.findOneAndDelete({ _id: id });
            return "Pedido Eliminado";
        },
    },
};

module.exports = resolvers;
