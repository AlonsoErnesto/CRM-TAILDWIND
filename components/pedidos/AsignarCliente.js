import React,{useState, useEffect, useContext} from 'react'
import Select from 'react-select';
import {  gql, useQuery } from '@apollo/client';
import PedidoContext from '../../context/pedidos/PedidoContext';


// obtener clientes usuario
const OBTENER_CLIENTES_USUARIO = gql`
   query obtenerClientesVendedor {
      obtenerClientesVendedor { 
         id
         nombre
         apellido
         empresa
         email
      }
   }
`;


const AsignarCliente = () => {

   const [cliente, setCliente] = useState([]);
   // Context de pedidos
   const pedidocontext = useContext(PedidoContext);
   const { agregarCliente } = pedidocontext;
   // Consultar a la base de datos
   const { data, loading, eror } = useQuery(OBTENER_CLIENTES_USUARIO);

   useEffect(() => {
      agregarCliente(cliente);
   }, [cliente]);

   const selecionarCliente = clientes => {
      setCliente(clientes);
   };

   //Resultado de la consulta
   if(loading) return null;

   const { obtenerClientesVendedor } = data;

   return (
      <>
         <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>1.- Asigna un cliente al pedido</p>
         <Select
            className='mt-4'
            options={obtenerClientesVendedor}
            // isMulti={true} multiples vendedores 
            onChange={opcion=>selecionarCliente(opcion)}
            getOptionValue = { opciones => opciones.id}
            getOptionLabel = { opciones => opciones.nombre}
            placeholder="Seleccione el cliente"
            noOptionsMessage={()=>'No hay resultados.'}
         />
      </>
   )
}

export default AsignarCliente;