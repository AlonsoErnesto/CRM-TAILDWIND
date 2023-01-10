import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

// OBTENER CLIENTE GQL
const OBTENER_CLIENTE = gql`
   query obtenerCliente ($id: ID!) {
      obtenerCliente(id: $id) {
         nombre
         apellido
         email
         telefono
         empresa
   }
}
`;


// ACTUALIZAR CLIENTE 
const ACTUALIZAR_CLIENTE = gql`
   mutation actualizarCliente ($id:ID!,$input:ClienteInput!){
   actualizarCliente(id:$id,input:$input){
      nombre
      apellido
      empresa
      email
   }
}
`;

const EditarCliente = () => {

   // Obtener id actual que se esta pasando por router
   const router = useRouter();
   const { query : {pid} } = router;

   // Schema de validacion
   const schemaValidacion = Yup.object({
      nombre : Yup.string().required('Complete el nombre'),
      apellido : Yup.string().required('El apellido es requerido'),
      empresa : Yup.string().required('El nombre de la empresa es requerido'),
      email : Yup.string().required('El email es requerido').email('Infrese correctamente el Email'),
      telefono : Yup.string().required('El telefono es requerido'),
   });

   // Consultar para obtener el cliente
   const { data, loading, error } = useQuery(OBTENER_CLIENTE,{
      variables : {
         id:pid
      }
   });

   // Actualizar el cliente
   const [ actualizarCliente ] = useMutation(ACTUALIZAR_CLIENTE);



   // Cargar antes de mostrar la informacion
   if(loading) return 'Cargando ...';


   // const { nombre,apellido,email,telefono,empresa } = data.obtenerCliente;
   const { obtenerCliente } = data;

   // Modifica el cliente de la BD
   const actualizarInfoCliente = async (valores) => {
      const { nombre,apellido,email,telefono,empresa} = valores;
      try {
         const { data } = await actualizarCliente({
            variables : {
               id : pid,
               input : {
                  nombre,
                  apellido,
                  email,
                  email,
                  telefono,
                  empresa,
               }
            }
         });
         // sweet alerta del cliente actualizado
         Swal.fire(
            'Editado!',
            'El cliente se edito correctamente.',
            'success'
         )
         // redirrecionar
         router.push('/');
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <Layout>
         <h1 className='text-2xl text-gray-800 font-light'>Editar Cliente</h1>
         <div className='flex justify-center mt-5'>
            <div className='w-full max-w-lg'>
               <Formik
                  validationSchema={schemaValidacion}
                  enableReinitialize
                  initialValues={obtenerCliente}
                  onSubmit = {(valores, funciones)=>{
                     actualizarInfoCliente(valores);
                  }}
               >
                  { props => {
                     return (
                        <form 
                           className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" 
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
                                 placeholder='Nombre del cliente'
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
                           {/*  ----------------------------APELLIDO ---------------------- */}
                           <div className='mb-4'>
                              <label className='block text-gray-700 text-sm font-bold mb-2 ' htmlFor='apellido'>
                                 Apellido
                              </label>
                              <input
                                 className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                 id="apellido"
                                 type="text"
                                 placeholder='Apellido del cliente'
                                 value = { props.values.apellido }
                                 onChange = {props.handleChange}
                                 onBlur = {props.handleBlur}
                              />
                           </div>
                           {/*  ------ VALIDATE APELLIDO ------ */}
                           { props.touched.apellido && props.errors.apellido ? (
                                 <div className='bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-2'>
                                    <p className='font-bold'>Error : </p>
                                    <p>{props.errors.apellido}</p>
                                 </div>
                              ) : null }
                           {/*  ---------------------------- Empresa ---------------------- */}
                           <div className='mb-4'>
                              <label className='block text-gray-700 text-sm font-bold mb-2 ' htmlFor='empresa'>
                                 Empresa
                              </label>
                              <input
                                 className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                 id="empresa"
                                 type="text"
                                 placeholder='Nombre de la Empresa'
                                 value = { props.values.empresa }
                                 onChange = {props.handleChange}
                                 onBlur = {props.handleBlur}
                              />
                           </div>
                           {/*  ------ VALIDATE EMPRESA ------ */}
                           { props.touched.empresa && props.errors.empresa ? (
                                 <div className='bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-2'>
                                    <p className='font-bold'>Error : </p>
                                    <p>{props.errors.empresa}</p>
                                 </div>
                              ) : null }
                           {/*  ----------------------------  EmailCliente ---------------------- */}
                           <div className='mb-4'>
                              <label className='block text-gray-700 text-sm font-bold mb-2 ' htmlFor='email'>
                                 Email
                              </label>
                              <input
                                 className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                 id="email"
                                 type="email"
                                 placeholder='Email del cliente'
                                 value = { props.values.email }
                                 onChange = {props.handleChange}
                                 onBlur = {props.handleBlur}
                              />
                           </div>
                           {/*  ------ VALIDATE EMAIL ------ */}
                           { props.touched.email && props.errors.email ? (
                                 <div className='bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-2'>
                                    <p className='font-bold'>Error : </p>
                                    <p>{props.errors.email}</p>
                                 </div>
                              ) : null }
                           {/*  ----------------------------  Telefono ---------------------- */}
                           <div className='mb-4'>
                              <label className='block text-gray-700 text-sm font-bold mb-2 ' htmlFor='telefono'>
                                 Telefono
                              </label>
                              <input
                                 className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                 id="telefono"
                                 type="tel"
                                 placeholder='Telefono del cliente'
                                 value = { props.values.telefono }
                                 onChange = {props.handleChange}
                                 onBlur = {props.handleBlur}
                              />
                              {/*  ------ VALIDATE TELEFONO ------ */}
                              { props.touched.telefono && props.errors.telefono ? (
                                 <div className='bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-2'>
                                    <p className='font-bold'>Error : </p>
                                    <p>{props.errors.telefono}</p>
                                 </div>
                              ) : null }
                              <input type="submit" className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900' value="Editar cliente"/>
                           </div>
                        </form>
                     )
                  }}
               </Formik>
            </div>
         </div>
      </Layout>
   )
}

export default EditarCliente;