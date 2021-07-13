import React from 'react';
import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router';

const OBTENER_USUARIO = gql`
    query obtenerUsuario{
        obtenerUsuario {
            id
            nombre
            apellido
        }
    }
`;

const Header = () => {

    const router = useRouter();

    const { data, loading} = useQuery(OBTENER_USUARIO);

    if(loading) return null;

    if(!data) {
        return router.push('/login');
    }

    const { nombre, apellido } = data.obtenerUsuario;

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        router.push('/login');
    }

    return ( 
        <div className="sm:flex sm:justify-between bg-gris p-5">
            <p className="mr-2 mb-5 lg:mb-0 text-lg text-gray-600">{nombre} {apellido}</p>

            <button 
                onClick={() => cerrarSesion() }
                type="button"
                className="bg-verde w-full sm:w-auto font-bold uppercase text-sm rounded py-1 px-3 text-white shadow-md"    
            >
                Cerrar Sesión
            </button>
        </div>
        
     );
}
 
export default Header;