import React, {useState, useEffect} from 'react';
import { gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';



// ACTUALIZAR PEDIDO
const ACTUALIZAR_PEDIDO = gql`
   mutation actualizarPedido ($id : ID!,$input:PedidoInput){
      actualizarPedido(id:$id,input:$input){
         estado
   }
}
`;
// ELIMINAR PEDIDO
const ELIMINAR_PEDIDO = gql`
   mutation eliminarPedido ($id : ID!) { 
      eliminarPedido (id:$id)
   }
`;

// OBTENER PEDIDOS
const OBTENER_PEDIDOS = gql`
   query obtenerPedidosVendedor {
      obtenerPedidosVendedor {
         id
   }
   }
`;

const Pedido = ({pedido}) => {

   const { id, total, cliente:{nombre, apellido, telefono,email}, estado, cliente} = pedido;
   // Mutation para cambiar el pedido
   const [ actualizarPedido ] = useMutation(ACTUALIZAR_PEDIDO);
   const [ eliminarPedido ] = useMutation(ELIMINAR_PEDIDO,{
      update(cache) {
         const { obtenerPedidosVendedor } = cache.readQuery({
            query : OBTENER_PEDIDOS
         });
         cache.writeQuery({
            query : OBTENER_PEDIDOS,
            data : {
               obtenerPedidosVendedor : obtenerPedidosVendedor.filter(pedido => pedido.id !== id)
            }
         })
      }
   });


   const [estadoPedido, setEstadoPedido] = useState(estado);
   const [clase, setClase] = useState('');
   useEffect(() => {
      if(estadoPedido){
         setEstadoPedido(estadoPedido);
      };
      clasePedido();
   }, [estadoPedido]);

   // Funcion que modifica el color del pedido de acuerdo a su estado
   const clasePedido = () => {
      if(estadoPedido==='Pendiente'){
         setClase('border-yellow-500');
      } else if(estadoPedido==='Completado'){
         setClase('border-green-500');
      } else {
         setClase('border-red-800');
      }
   }

   const cambiarEstadoPedido = async nuevoestado => {
      try {
         const { data } = await actualizarPedido({
            variables : {
               id,
               input : {
                  estado:nuevoestado,
                  cliente:cliente.id
               }
            }
         });
         setEstadoPedido(data.actualizarPedido.estado);
         
      } catch (err) {
         console.log('ERROR',err)
      }
   };

   // Eliminar Pedido
   const confimarEliminarPedido =  () => {
      Swal.fire({
         title: 'Deseas eliminar este pedido?',
         text: "No se podra revertir al eliminar!",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Si, eliminar!',
         cancelButtonText : 'Cancelar'
      }).then(async (result) => {
         if (result.isConfirmed) {
            try {
               // Eliminar por ID
               const data = await eliminarPedido({
                  variables:{
                     id
                  }
               })
               
               // Mostrar por alerta
               Swal.fire(
                  'Eliminado!',
                  data.eliminarPedido,
                  'success',
               )
            } catch (err) {
               console.log(err)
            }
         }
      })
   };

   return ( 
      <div className={ `${clase} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}>
         <div>
            <p className='font-bold text-gray-800'>Cliente: {nombre} {apellido}</p>
            {  email && (
               <p className='flex items-center my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                     <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                  </svg>
                  {email}
               </p>
            )}
            { telefono && (
               <p className='flex items-center my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                  </svg>
                  {telefono}
               </p>
            )}
            <h2 className='text-gray-800 font-bold mt-10'>Estado del pedido:</h2>
            <select 
               className='mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold'
               value={estadoPedido}
               onChange={(e)=>cambiarEstadoPedido(e.target.value)}
            >
               <option value="Completado">COMPLETADO</option>
               <option value="Pendiente">PENDIENTE</option>
               <option value="Cancelado">CANCELADO</option>
            </select>
         </div>
         <div>
            <h2 className='text-gray-800 font-bold mt-2'>Resumen del Pedido</h2>
            { pedido.pedidos.map(articulo => (
               <div className='mt-4' key={articulo.id}>
                  <p className='text-sm text-gray-600'>Producto : {articulo.nombre}</p>
                  <p className='text-sm text-gray-600'>Cantidad : {articulo.cantidad}</p>
               </div>
            ))}
            <p className='text-gray-800 mt-3 font-bold '>Total a pagar: 
               <span className='font-light'>  S/. {total}</span>
            </p>
            
            <button
               className='uppercase text-xs font-bold  flex items-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded leading-tight'
               onClick={()=>confimarEliminarPedido()}
            >
               Eliminar Pedido
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            </button>
         </div>
      </div>
   )
}

export default Pedido;