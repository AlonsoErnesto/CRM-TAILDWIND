import React,{useReducer} from 'react';
import PedidoContext from './PedidoContext';
import PedidoReducer from './PedidoReducer';

import { SELECCIONAR_CLIENTE, SELECCIONAR_PRODUCTO, CANTIDAD_PRODUCTOS,ACTUALIZAR_TOTAL } from '../../types';

const PedidoState = ({children}) => {

   // State de pedidos
   const initialState = {
      cliente : {},
      productos : [],
      total : 0,
   };
   const [ state, dispatch ] = useReducer(PedidoReducer, initialState);

   // modifica el cliente
   const agregarCliente = cliente => {
      dispatch({
         type : SELECCIONAR_CLIENTE,
         payload : cliente
      });
   };

   // Modificar el producto
   const agregarProducto = productosSeleecionados => {
      let nuevoState;
      if(state.productos.length > 0) {
         // tomar del segundo arreglo una copia para asignarlo al primero
         nuevoState = productosSeleecionados.map((producto) =>{
            const nuevoObjeto = state.productos.find(productoState => productoState.id === producto.id);
            return {
               ...producto, 
               ...nuevoObjeto
            }
         })
      } else {
         nuevoState = productosSeleecionados;
      }
      dispatch({
         type:SELECCIONAR_PRODUCTO,
         payload:nuevoState
      });
   };

   // Modifica las cantidades de los productos
   const cantidadProductos = nuevoProducto => {
      dispatch({
         type:CANTIDAD_PRODUCTOS,
         payload:nuevoProducto
      });
   };

   const actualizarTotal = () => {
      dispatch({
         type:ACTUALIZAR_TOTAL,

      })
   };

   return (
      <PedidoContext.Provider 
         value={{
            productos : state.productos,
            total:state.total,
            agregarCliente,
            agregarProducto,
            cantidadProductos,
            actualizarTotal
         }}
      >
         {children}
      </PedidoContext.Provider>
   )
}

export default PedidoState;