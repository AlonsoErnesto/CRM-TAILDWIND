import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router'


const OBTENER_USUARIO = gql`
   query obtenerUsuario {
      obtenerUsuario {
         id
         nombre
         apellido
      }
   }
`;

const Header = () => {

   const router = useRouter();

   const { data, loading, error} = useQuery(OBTENER_USUARIO);

   // Proteger que no accedamos a data antes de tener los resultados;
   if(loading)  return null;

   //Si no hay informacion
   if(!data) { return router.push('/login');}

   const { nombre, apellido } = data.obtenerUsuario;

   // Cerrar Sesion
   const cerrarSesion = () => {
      localStorage.removeItem('token');
      router.push('/login')

   }

   return (
      <div className='flex justify-between mb-6'>
         <h1 className='mr-2'>Hola, <b>{nombre} {apellido}</b></h1>
         <button 
            onClick={()=>cerrarSesion()}
            type="button" 
            className='bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md'>
               Cerrar Sesion
         </button>
      </div>
   )
}

export default Header;