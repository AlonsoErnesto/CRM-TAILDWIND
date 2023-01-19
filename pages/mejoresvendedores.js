import React,{useEffect} from 'react'
import Layout from '../components/Layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { gql, useQuery } from '@apollo/client';


// MEJORES VENDEDORES
const MEJORES_VENDEDORES = gql`
   query mejoresVendedores {
      mejoresVendedores {
         vendedor {
            nombre
            email
         }
         total
      }
   }
`;


const MejoresVendedores = () => {
   const { data, loading, error, startPolling, stopPolling } = useQuery(MEJORES_VENDEDORES);
   useEffect(() => {
      startPolling(1000);
      return () => {
         stopPolling();
      }
   }, [startPolling,stopPolling]);
   if(loading) return 'Cargando...';
   const { mejoresVendedores} = data;
   const vendedorGrafica = [ ] ;
   mejoresVendedores.map((vendedor,i)=>{
      vendedorGrafica[i] = {
         ...vendedor.vendedor[0],
         total:vendedor.total
      }
   });

   return (
      <Layout>
         <h1 className='text-2xl text-gray-800 font-light'>Mejores vendedores</h1>
         <ResponsiveContainer
            width={'99%'}
            height={550}
         >
            <BarChart
               width={300}
               height={500}
               data={vendedorGrafica}
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
         </ResponsiveContainer>
         
      </Layout>
   )
}

export default MejoresVendedores;