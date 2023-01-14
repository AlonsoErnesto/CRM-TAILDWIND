import React,{useContext} from 'react';

// Components
import Layout from '../components/Layout';
import AsignarCliente from '../components/pedidos/AsignarCliente';
import AsignarProductos from '../components/pedidos/AsignarProductos';
import ResumenPedido from '../components/pedidos/ResumenPedido';
import Total from '../components/pedidos/Total';

// Context de pedidos
import PedidoContext from '../context/pedidos/PedidoContext';

const NuevoPedido = () => {

   // Extraer valores del contextPedido
   const pedidoContext = useContext(PedidoContext);

   return (
      <Layout>
         <h1 className='text-2xl text-gray-800 font-light'>Crear nuevo pedido</h1>
         <div className='flex justify-center mt-5'>
            <div className='w-full max-w-lg'>
               <AsignarCliente/>
               <AsignarProductos/>
               <ResumenPedido/>
               <Total/>
               <button type='button' className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900`}>Registar pedido</button>
            </div>
         </div>
      </Layout>
   )
}

export default NuevoPedido;