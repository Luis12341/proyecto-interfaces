import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select'
import { gql, useQuery } from '@apollo/client';
import PedidoContext from '../../context/pedidos/PedidoContext';

const OBTENER_CLIENTES_USUARIO = gql`
    query obtenerClientes {
        obtenerClientes {
            id
            cedula
            nombre
            apellido
            empresa
            email
        }
    }
`;

const AsignarCliente = () => {

    const [ cliente, setCliente ] = useState([]);

    const pedidoContext = useContext(PedidoContext);
    const { agregarCliente} = pedidoContext;
    

    const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);


    useEffect(() => {
        agregarCliente(cliente);
    }, [cliente]) //eslint-disable-line

    const seleccionarCliente = clientes => {
        setCliente(clientes);
    }

    if(loading) return null;

    const { obtenerClientes } = data;

    return ( 

        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">1.- Asigna un Cliente al pedido</p>
            <Select
                className="mt-3"
                options={ obtenerClientes }
                onChange={ opcion => seleccionarCliente(opcion) }
                getOptionValue={ opciones => opciones.id }
                getOptionLabel={ opciones => `${opciones.cedula} ${opciones.nombre}`  }
                placeholder="Busque o Seleccione el Cliente"
                noOptionsMessage={() => "No hay resultados"}
            />

        </>
     );
}
 
export default AsignarCliente;