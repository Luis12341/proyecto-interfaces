import React from 'react';
import Swal from 'sweetalert2'
import { gql, useMutation } from '@apollo/client'
import Router from 'next/router';


const OBTENER_PRODUCTOS = gql`
  query obtenerProductos {
      obtenerProductos {
          id
          nombre
          precio
          existencia
      }
  }
`;

const Producto = ({producto}) => {
    const { nombre, precio, existencia, id } = producto;

    const editarProducto = () => {
        console.log('click')
        Router.push({
            pathname: "/editarproducto/[id]",
            query: { id }
        })
    }

    return ( 
        <tr>
            <td className="border px-4 py-2">{nombre} </td>
            <td className="border px-4 py-2">{existencia} Piezas</td>
            <td className="border px-4 py-2">$ {precio} </td>
            <td className="border px-4 py-2">
                     <button
                        type="button"
                        className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                        onClick={() => editarProducto() }
                    >
                        Editar
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 ml-2"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
            </td>
        </tr>
     );
}
 
export default Producto;