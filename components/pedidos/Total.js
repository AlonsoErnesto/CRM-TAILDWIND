import React, { useContext } from 'react';
import PedidoContext from '../../context/pedidos/PedidoContext';


const Total = () => {

   // context de pedido
   const pedidoContext = useContext(PedidoContext);
   const { total } = pedidoContext;

   return (
      <>
      <div>
         <div className='flex justify-between'>
            <hr/>
            <hr className='h-1 my-5 bg-gray-700 w-1/2 right-0' />
         </div>
         <div className='flex items-center mt-1 justify-between bg-white p-3'>
            <h2 className='text-gray-800 text-lg'>Total a pagar:</h2>
            <p className='text-gray-800 mt-0 text-lg'>S/. {total}.00</p>
         </div>
      </div>
      </>
   )
};

export default Total;