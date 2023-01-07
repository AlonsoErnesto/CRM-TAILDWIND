import React from 'react';
import Layout from '../components/Layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const NUEVO_CLIENTE = gql`
mutation nuevoCliente ($input:ClienteInput){
   nuevoCliente(input:$input){
      id
      nombre
      apellido
      empresa
      email
      telefono
   }
}
`;


const NuevoCliente = () => {

   const router = useRouter();

      // mutation para crear nuevos clientes
   const [ nuevoCliente ] = useMutation(NUEVO_CLIENTE);

   const formik = useFormik({
      initialValues: {
         nombre : '',
         apellido : '',
         empresa : '',
         email : '' ,
         telefono : ''
      },
      validationSchema : Yup.object({
         nombre : Yup.string().required('Complete el nombre'),
         apellido : Yup.string().required('El apellido es requerido'),
         empresa : Yup.string().required('El nombre de la empresa es requerido'),
         email : Yup.string().required('El email es requerido').email('Infrese correctamente el Email'),
         telefono : Yup.string().required('El telefono es requerido'),
      }),
      onSubmit : async valores => {
         const { nombre, apellido, empresa, email, telefono } = valores;
         console.log(valores)
         try {
            const {data} =  await nuevoCliente({
               variables:{
                  input:{
                     nombre,
                     apellido,
                     empresa,
                     email,
                     telefono
                  }
               }
            });
            router.push('/');
         } catch (err) {
            console.log('ERROR',err)   
         }
      }
   });


   return (
      <Layout>
         <h1 className='text-2xl text-gray-800 font-light'>Nuevo Cliente</h1>
         <div className='flex justify-center mt-5'>
            <div className='w-full max-w-lg'>
               <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
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
                        value = { formik.values.apellido }
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                     />
                  </div>
                  {/*  ------ VALIDATE APELLIDO ------ */}
                  { formik.touched.apellido && formik.errors.apellido ? (
                        <div className='bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-2'>
                           <p className='font-bold'>Error : </p>
                           <p>{formik.errors.apellido}</p>
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
                        value = { formik.values.empresa }
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                     />
                  </div>
                  {/*  ------ VALIDATE EMPRESA ------ */}
                  { formik.touched.empresa && formik.errors.empresa ? (
                        <div className='bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-2'>
                           <p className='font-bold'>Error : </p>
                           <p>{formik.errors.empresa}</p>
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
                        value = { formik.values.email }
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                     />
                  </div>
                  {/*  ------ VALIDATE EMAIL ------ */}
                  { formik.touched.email && formik.errors.email ? (
                        <div className='bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-2'>
                           <p className='font-bold'>Error : </p>
                           <p>{formik.errors.email}</p>
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
                        value = { formik.values.telefono }
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                     />
                     {/*  ------ VALIDATE TELEFONO ------ */}
                     { formik.touched.telefono && formik.errors.telefono ? (
                        <div className='bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-2'>
                           <p className='font-bold'>Error : </p>
                           <p>{formik.errors.telefono}</p>
                        </div>
                     ) : null }
                     <input type="submit" className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900' value="Registrar cliente"/>
                  </div>
               </form>
            </div>
         </div>
      </Layout>
   )
}

export default NuevoCliente