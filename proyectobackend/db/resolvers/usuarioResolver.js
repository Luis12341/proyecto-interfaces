const Usuario = require("../../models/Usuario");

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });


const crearToken = (usuario, secreta, expiresIn) => {

    const { id, email,nombre, apellido } = usuario;

    return jwt.sign( { id, email, nombre, apellido }, secreta, { expiresIn } )
}

const resolvers = {
    Query: {
        obtenerUsuario: async (_, {}, ctx) => {
            return ctx.usuario;
        },
    },
    Mutation: {
        nuevoUsuario: async (_, { input }) => {
            const { email, password } = input;

            const existeUsuario = await Usuario.findOne({ email });
            if (existeUsuario) {
                throw new Error("El usuario ya esta registrado");
            }

            const salt = await bcryptjs.genSalt(10);
            input.password = await bcryptjs.hash(password, salt);

            try {
                const usuario = new Usuario(input);
                await usuario.save()
                return usuario;
            } catch (error) {
                console.log(error);
            }
        },
        autenticarUsuario: async (_, { input }) => {
            const { email, password } = input;

            const existeUsuario = await Usuario.findOne({ email });
            if (!existeUsuario) {
                throw new Error("El usuario no existe");
            }

            const passwordCorrecto = await bcryptjs.compare(
                password,
                existeUsuario.password
            );
            if (!passwordCorrecto) {
                throw new Error("El Password es Incorrecto");
            }

            return {
                token: crearToken(existeUsuario, process.env.SECRETA, "48h"),
            };
        },
    },
};

module.exports = resolvers;
