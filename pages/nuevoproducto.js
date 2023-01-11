import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import {gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

import Layout from '../components/Layout';


// NUEVO PRODUCTO
const NUEVO_PRODUCTO = gql`
   mutation nuevoProducto($input:ProductoInput){
      nuevoProducto (input:$input){
         id
         nombre
         existencia
         precio
         creado
   }  
}  
`;

// QUERY PARA OBTENER LOS PRODUCTOS
const OBTENER_PRODUCTOS = gql`
   query obtenerProductos{
   obtenerProductos {
      id
      nombre
      existencia
      precio
      creado
   }
}
`;

const NuevoProducto = () => {

   const router = useRouter();
   const [ nuevoProducto ] = useMutation(NUEVO_PRODUCTO,{
      update(cache,{data:{nuevoProducto}}){
         // obtener el objeto de cache
         const { obtenerProductos } = cache.readQuery({query:OBTENER_PRODUCTOS});
         // reecribir ese objeto
         cache.writeQuery({
            query:OBTENER_PRODUCTOS,
            data : {
               obtenerProductos : [...obtenerProductos,nuevoProducto],
            }
         })
      }
   });

   // Formulario para nuevos productos
   const formik = useFormik({
      initialValues : {
         nombre: '',
         existencia : '',
         precio : '',  
      },
      validationSchema : Yup.object({
         nombre : Yup.string().required('Es necesario el campo del nombre del producto.'),
         existencia : Yup.number().required('Es necesario el campo de cantidad del producto.').positive('No se aceptan numeros negativos').integer('Ingrese cantidades enteros.'),
         precio : Yup.number().required('Es necesario el campo del precio del producto.').positive('No se aceptan numeros negativos'),
      }),
      onSubmit : async valores => {

         const { nombre, existencia, precio} = valores;

         try{
            const {data}=await nuevoProducto({
               variables:{
                  input : {
                     nombre,
                     existencia,
                     precio,
                  }
               }
            });
            //Mostrar alerta
            Swal.fire(
               'Producto creado!',
               'Se creo correctamente',
               'success'
            )
            
            // Redireccionar hacia productos
            router.push('/productos');
         } catch(err){
            console.log(err);
         }
      }
   });

   return (
      <Layout>
         <h1 className='text-2xl text-gray-800 font-light'>Crear nuevo producto</h1>
         <div className='flex justify-center mt-5'>
            <div className='w-full max-w-lg'>
               <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" 
               onSubmit={formik.handleSubmit}
               >
                  {/*  ----------------------------NOMBRE ---------------------- */}
                     <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2 ' htmlFor='nombre'>
                           Nombre
                        </label>
                        <input
                           className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                           id="nombre"
                           type="text"
                           placeholder='Nombre'
                           value = { formik.values.nombre }
                           onChange = {formik.handleChange}
                           onBlur = {formik.handleBlur}
                        />
                     </div>
                     {/*  ------ VALIDATE NOMBRE ------ */}
                     { formik.touched.nombre && formik.errors.nombre ? (
                        <div className='bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-2'>
                           <p className='font-bold'>Error : </p>
                           <p>{formik.errors.nombre}</p>
                        </div>
                     ) : null }
                  {/*  ----------------------------EXISTENCIA---------------------- */}
                     <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2 ' htmlFor='existencia'>
                           Cantidad disponible
                        </label>
                        <input
                           className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                           id="existencia"
                           type="number"
                           placeholder='Cantidad disponible'
                           value = { formik.values.existencia }
                           onChange = {formik.handleChange}
                           onBlur = {formik.handleBlur}
                        />
                     </div>
                     {/*  ------ VALIDATE EXISTENCIA ------ */}
                     { formik.touched.existencia && formik.errors.existencia ? (
                        <div className='bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-2'>
                           <p className='font-bold'>Error : </p>
                           <p>{formik.errors.existencia}</p>
                        </div>
                     ) : null }
                     {/*  ----------------------------PRECIO---------------------- */}
                     <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2 ' htmlFor='precio'>
                           Precio
                        </label>
                        <input
                           className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                           id="precio"
                           type="number"
                           placeholder='Precio por unidad'
                           value = { formik.values.precio }
                           onChange = {formik.handleChange}
                           onBlur = {formik.handleBlur}
                        />
                     </div>
                     {/*  ------ VALIDATE PRECIO ------ */}
                     { formik.touched.precio && formik.errors.precio ? (
                        <div className='bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-2'>
                           <p className='font-bold'>Error : </p>
                           <p>{formik.errors.precio}</p>
                        </div>
                     ) : null }
                     <input type="submit" className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900' value="Crear nuevo producto"/>
               </form>
            </div>
         </div>
      </Layout>
   )
}

export default NuevoProducto