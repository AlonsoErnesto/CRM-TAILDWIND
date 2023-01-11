import React from 'react'
import { useRouter } from 'next/router';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Formik } from 'formik'
import * as Yup from 'yup';
import Swal from 'sweetalert2';

import Layout from '../../components/Layout';


// OBTENER PRODUCTO 
const OBTENER_PRODUCTO = gql`
   query obtenerProducto ($id: ID!){
      obtenerProducto(id: $id) {
         nombre
         precio
         existencia
   }
}
`;

// ACTUALIZAR PRODUCTO;
const MODIFICAR_PRODUCTO = gql`
   mutation actualizarProducto($id:ID!,$input:ProductoInput){
   actualizarProducto(id:$id, input:$input ){
      id
      nombre
      precio
      existencia
   }
}
`;


const EditarProducto = () => {

   const router = useRouter();
   const { query:{pid} } = router;
   // console.log(pid)

   const { data, loading, error } =  useQuery(OBTENER_PRODUCTO,{
      variables : {
         id:pid
      }
   });


   // Mutation de modificar producto
   const [actualizarProducto] = useMutation(MODIFICAR_PRODUCTO,{
      update(cache){

      }
   });


   if(loading) return 'Cargando...';
   if(!data) return 'Accion no permitida';
   const actualizarInfoProducto = async valores => {
      const { nombre, existencia, precio } = valores;
      try {
         const { data } = await actualizarProducto({
            variables : {
               id :pid,
               input : {
                  nombre,
                  precio,
                  existencia
               }
            }
         })  ;
         console.log(data);

         // redirigit hacia productos
         router.push('/productos');
         //Mostrar alerta
         Swal.fire(
            'Modificado!',
            'El producto se modifico correctamente',
            'success'
         );
      } catch (err) {
         console.log(err);
      }
   };

   const { obtenerProducto } = data;

   // Schema validation 
   const schemaValidation = Yup.object({
      nombre : Yup.string().required('Es necesario el campo del nombre del producto.'),
      existencia : Yup.number().required('Es necesario el campo de cantidad del producto.').positive('No se aceptan numeros negativos').integer('Ingrese cantidades enteros.'),
      precio : Yup.number().required('Es necesario el campo del precio del producto.').positive('No se aceptan numeros negativos'),
   });

   return (
      <Layout>
         <h1 className='text-2xl text-gray-800 font-light'>Editar Producto</h1>
         <div className='flex justify-center mt-5'>
            <div className='w-full max-w-lg'>
               <Formik
                  enableReinitialize
                  initialValues={obtenerProducto}
                  validationSchema={schemaValidation}
                  onSubmit={(valores, acciones)  => {
                     actualizarInfoProducto(valores);
                  }}
               >
                  {props => {
                     return (
                        <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" 
                        onSubmit={props.handleSubmit}
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
                           value = { props.values.nombre }
                           onChange = {props.handleChange}
                           onBlur = {props.handleBlur}
                        />
                     </div>
                     {/*  ------ VALIDATE NOMBRE ------ */}
                     { props.touched.nombre && props.errors.nombre ? (
                        <div className='bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-2'>
                           <p className='font-bold'>Error : </p>
                           <p>{props.errors.nombre}</p>
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
                           value = { props.values.existencia }
                           onChange = {props.handleChange}
                           onBlur = {props.handleBlur}
                        />
                     </div>
                     {/*  ------ VALIDATE EXISTENCIA ------ */}
                     { props.touched.existencia && props.errors.existencia ? (
                        <div className='bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-2'>
                           <p className='font-bold'>Error : </p>
                           <p>{props.errors.existencia}</p>
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
                           value = { props.values.precio }
                           onChange = {props.handleChange}
                           onBlur = {props.handleBlur}
                        />
                     </div>
                     {/*  ------ VALIDATE PRECIO ------ */}
                     { props.touched.precio && props.errors.precio ? (
                        <div className='bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-2'>
                           <p className='font-bold'>Error : </p>
                           <p>{props.errors.precio}</p>
                        </div>
                     ) : null }
                     <input type="submit" className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900' value="Modificar producto"/>
                        </form>
                     )
                  }}
               </Formik>
            </div>
         </div>
      </Layout>
   )
}

export default EditarProducto;