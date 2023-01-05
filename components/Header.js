import React from 'react';
import { useQuery, gql } from '@apollo/client';


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

   const { data, loading, error} = useQuery(OBTENER_USUARIO);

   // Proteger que no accedamos a data antes de tener los resultados;
   if(loading)  return null;
   const { nombre, apellido } = data.obtenerUsuario;

   return (
      <div className='flex justify-between mb-6'>
         <h1 className='mr-2'>Hola, <b>{nombre} {apellido}</b></h1>
         <button type="button" className=''>Cerrar Sesion</button>
      </div>
   )
}

export default Header;