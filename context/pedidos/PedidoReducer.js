import { SELECCIONAR_CLIENTE, SELECCIONAR_PRODUCTO, CANTIDAD_PRODUCTOS } from '../../types';

// payload y type bienen de PedidoState(dispaych)
// payload = action.payload
// type = action.type
export default (state,action) => {
   switch(action.type) {
      case SELECCIONAR_CLIENTE:
         return {
               ...state,
               cliente : action.payload
            }
      case SELECCIONAR_PRODUCTO:
         return {
            ...state,
            productos : action.payload
         }
      default:
         return state;
   }
}