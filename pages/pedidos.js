import React from 'react'
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';

import Layout from '../components/Layout';
import Pedido from '../components/Pedido';

// OBTENER PEDIDOS
const OBTENER_PEDIDOS = gql`
   query obtenerPedidosVendedor {
      obtenerPedidosVendedor {
         id
         pedido {
            id
            cantidad
         }
         cliente
         vendedor
         total
         estado
      }
   }
`;


const Pedidos = () => {

   const { data, loading, error } = useQuery(OBTENER_PEDIDOS);
   if(loading) return 'Cargando...';
   const { obtenerPedidosVendedor } = data;

   return (
      <div>
         <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>
            <Link href="/nuevopedido" legacyBehavior>
               <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">Nuevo Pedido</a>
            </Link>
            { obtenerPedidosVendedor.length === 0 ? (
               <p className='mt-5 text-center text-2xl'>No hay pedidos aun.</p>
            ) : (
               obtenerPedidosVendedor.map(pedido => (
                  <Pedido key={pedido.id} pedido={pedido}/>
               ))
            )}
         </Layout>
      </div>
   )
}

export default Pedidos;