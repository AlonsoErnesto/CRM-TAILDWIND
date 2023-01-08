import React from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';

const ELIMINAR_CLIENTE = gql`
   mutation eliminarCliente ($id:ID!){
      eliminarCliente (id:$id)
   }
`;

const OBTENER_CLIENTES_USUARIO = gql`
   query obtenerClientesVendedor {
      obtenerClientesVendedor { 
         id
         nombre
         apellido
         empresa
         email
      }
   }
`;

const Cliente = ({cliente}) => {

   //mutation para eliminar el cliente
   const [ eliminarCliente ] = useMutation(ELIMINAR_CLIENTE, {
      update(cache){
         // obtener una copia del objeto de cache
         const {obtenerClientesVendedor} = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO });
         // Reescribir el cache
         cache.writeQuery({
            query : OBTENER_CLIENTES_USUARIO,
            data : {
               obtenerClientesVendedor : obtenerClientesVendedor.filter( clienteActual => clienteActual.id !== id )
            }
         });
      }
   });

   const { nombre, apellido, empresa, email, id } = cliente;

   // EliminarCliente
   const confirmarEliminarCliente = (id) => {
      Swal.fire({
         title: 'Deseas eliminar este cliente?',
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
               const { data } = await eliminarCliente({
                  variables : {
                     id
                  }
               });
               // Mostrar por alerta
               Swal.fire(
                  'Eliminado!',
                  data.eliminarCliente,
                  'success',
               )
            } catch (err) {
               console.log(err)
            }
         }
      })
   };

   return (
         <tr key={id}>
            <td className="border px-4 py-2">{nombre} {apellido}</td>
            <td className="border px-4 py-2">{empresa}</td>
            <td className="border px-4 py-2">{email}</td>
            <td className="border px-4 py-2">
               <button 
                  type="button" 
                  className='flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold'
                  onClick={()=>confirmarEliminarCliente(id)}
               >
                  Eliminar
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
               </button>
            </td>
         </tr>
   )
}

export default Cliente;