import React,{useContext} from 'react';
import Layout from '../components/Layout';
import AsignarCliente from '../components/pedidos/AsignarCliente';

// Context de pedidos
import PedidoContext from '../context/pedidos/PedidoContext';

const NuevoPedido = () => {

   // Extraer valores del contextPedido
   const pedidoContext = useContext(PedidoContext);

   return (
      <Layout>
         <h1 className='text-2xl text-gray-800 font-light'>Crear nuevo pedido</h1>
         <AsignarCliente/>
      </Layout>
   )
}

export default NuevoPedido;