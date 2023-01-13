import React,{useEffect,useState,useContext} from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';
import PedidoContext from '../../context/pedidos/PedidoContext';

// OBTENER PRODUCTOS
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


const AsignarProductos = () => {

   const [productos, setProductos] = useState([]);
   const pedidoContext = useContext(PedidoContext);
   const { agregarProducto } = pedidoContext;

   // consultar a la base de datos
   const {data, loading, error} = useQuery(OBTENER_PRODUCTOS);

   useEffect(() => {
      console.log(productos);
   }, [productos]);

   const seleccionarProducto = producto => {
      agregarProducto(producto);
   }; 

   if(loading) return null;
   const { obtenerProductos } = data;

   return (
      <>
         <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>2.- Asigna un producto al pedido</p>
         <Select
            className='mt-4'
            options={obtenerProductos}
            isMulti={true} multiples vendedores 
            onChange={producto=>seleccionarProducto(producto)}
            getOptionValue = { opciones => opciones.id}
            getOptionLabel = { opciones => `${opciones.nombre} - ${opciones.existencia} disponibles`}
            placeholder="Seleccione el producto"
            noOptionsMessage={()=>'No hay resultados.'}
         />
      </>
   )
};

export default AsignarProductos;