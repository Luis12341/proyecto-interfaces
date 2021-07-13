const Producto = require("../../models/Producto");

const resolvers = {
    Query: {
        obtenerProductos: async () => {
            try {
                const productos = await Producto.find({});
                return productos;
            } catch (error) {
                console.log(error);
            }
        },
        obtenerProducto: async (_, { id }) => {
            const producto = await Producto.findById(id);

            if (!producto) {
                throw new Error("Producto no encontrado");
            }

            return producto;
        },
        buscarProducto: async(_, { texto }) => {
            const productos = await Producto.find({ $text: { $search: texto  } }).limit(10)

            return productos;
        }
    },
    Mutation: {
        nuevoProducto: async (_, { input }) => {
            try {
                const producto = new Producto(input);

                const resultado = await producto.save();

                return resultado;
            } catch (error) {
                console.log(error);
            }
        },
        actualizarProducto: async (_, { id, input }) => {
            let producto = await Producto.findById(id);

            if (!producto) {
                throw new Error("Producto no encontrado");
            }

            producto = await Producto.findOneAndUpdate({ _id: id }, input, {
                new: true,
            });

            return producto;
        }
    },
};

module.exports = resolvers;
