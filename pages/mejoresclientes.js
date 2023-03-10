import React,{useEffect} from 'react'
import Layout from '../components/Layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { gql, useQuery } from '@apollo/client';


// MEJORES VENDEDORES
const MEJORES_CLIENTES = gql`
   query mejoresClientes {
      mejoresClientes {
         cliente {
            nombre
            empresa
         }
         total
      }
   }
`;


const MejoresClientes = () => {
   const { data, loading, error, startPolling, stopPolling } = useQuery(MEJORES_CLIENTES);
   useEffect(() => {
      startPolling(1000);
      return () => {
         stopPolling();
      }
   }, [startPolling,stopPolling]);
   if(loading) return 'Cargando...';
   const { mejoresClientes} = data;
   const clienteGrafica = [ ] ;
   mejoresClientes.map((cliente,i)=>{
      clienteGrafica[i] = {
         ...cliente.cliente[0],
         total:cliente.total
      }
   });

   return (
      <Layout>
         <h1 className='text-2xl text-gray-800 font-light'>Mejores clientes</h1>
         <BarChart
            width={600}
            height={500}
            data={clienteGrafica}
            margin={{
               top: 5,
               right: 30,
               left: 20,
               bottom: 5,
            }}
         >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#3182cd" />
         </BarChart>
      </Layout>
   )
}

export default MejoresClientes;