import React,{useContext,useState} from 'react';
import {gql, useMutation} from '@apollo/client';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

// Components
import Layout from '../components/Layout';
import AsignarCliente from '../components/pedidos/AsignarCliente';
import AsignarProductos from '../components/pedidos/AsignarProductos';
import ResumenPedido from '../components/pedidos/ResumenPedido';
import Total from '../components/pedidos/Total';

// Context de pedidos
import PedidoContext from '../context/pedidos/PedidoContext';


// Mutation para nuevo pedido
const NUEVO_PEDIDO = gql`
   mutation nuevoPedido($input : PedidoInput){
      nuevoPedido(input:$input){
         id
      }
   }
`;

// OBTENER PEDIDOS
const OBTENER_PEDIDOS = gql`
   query obtenerPedidosVendedor {
      obtenerPedidosVendedor {
         id
         pedidos {
            id
            cantidad
            nombre
         }
         estado
         cliente {
            id
            nombre
            apellido
            email
            telefono
         }
         vendedor
         total
      }
   }
`;

const NuevoPedido = () => {

   const router = useRouter();
   const [mensaje, setMensaje] = useState(null);
   // Extraer valores del contextPedido
   const pedidoContext = useContext(PedidoContext);
   const { cliente, productos, total } = pedidoContext;
   const [ nuevoPedido ] = useMutation(NUEVO_PEDIDO,{
      update(cache,{data:{nuevoPedido}}) {
         const { obtenerPedidosVendedor} = cache.readQuery({
            query : OBTENER_PEDIDOS
         });
         cache.writeQuery({
            query : OBTENER_PEDIDOS,
            data : {
               obtenerPedidosVendedor : [...obtenerPedidosVendedor , nuevoPedido]
            }
         })
      }
   });

   const validarPedido = () => {
      return !productos.every(producto => producto.cantidad > 0) || total === 0 || cliente.length === 0 ? " opacity-50 cursor-not-allowed " : "" ;

   }

   const crearNuevoCliente = async () => {
      const { id } = cliente;
      // Remover lo que no se necesita de productos
      const pedidos = productos.map(({__typename,existencia, ...producto}) => producto );
      try {
         const { data } = await nuevoPedido({
            variables : {
               input : {
                  cliente : id,
                  total,
                  pedidos
               }
            }
         });
         router.push('/pedidos');
         Swal.fire(
            'Creado!',
            'El pedido se registro correctamente.',
            'success'
         )
      } catch (err) {
         setMensaje(err.message);
         setTimeout(() => {
            setMensaje(null);
         }, 3000);
      }
   };

   const mostrarMensaje =  () => {
      return (
         <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
            <p>{mensaje}</p>
         </div>
      )
   }

   return (
      <Layout>
         <h1 className='text-2xl text-gray-800 font-light'>Crear nuevo pedido</h1>
         { mensaje && mostrarMensaje()}
         <div className='flex justify-center mt-5'>
            <div className='w-full max-w-lg'>
               <AsignarCliente/>
               <AsignarProductos/>
               <ResumenPedido/>
               <Total/>
               <button 
                  type='button' 
                  className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validarPedido()}`}
                  onClick={() => crearNuevoCliente()}
               >
                  Registar pedido
               </button>
            </div>
         </div>
      </Layout>
   )
}

export default NuevoPedido;