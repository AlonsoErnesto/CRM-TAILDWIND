import { React, useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';

//Component
import Layout from '../components/Layout';


const NUEVA_CUENTA = gql`
   mutation nuevoUsuario($input:UsuarioInput) {
      nuevoUsuario (input:$input){
         id
         nombre
         apellido
         email
   }
}
`;


const Nuevacuenta = () => {

   //State mensaje
   const [mensaje, setMensaje] = useState(null);

   // Mutation para crar nuevos usuarios
   const [ nuevoUsuario ] = useMutation(NUEVA_CUENTA);

   //Routing
   const router = useRouter();

   // Validacion del formulario
   const formik = useFormik({
      initialValues : {
         nombre : '',
         apellido : '',
         email : '',
         password : ''
      },
      validationSchema : Yup.object({
         nombre : Yup.string().required('El nombre es hobligatorio').min(3,'Minimo 3 caracteres'),
         apellido : Yup.string().required('El apellido es hobligatorio').min(3,'Minimo 5 caracteres'),
         email : Yup.string().required('El Email es hobligatorio').email('El email es incorrecto'),
         password : Yup.string().required('El password es hobligatorio').min(5,'Minimo 5 caracteres'),
      }),
      onSubmit : async valores => {
         //console.log('enviando');
         //console.log(valores);
         const { nombre , apellido , email , password} = valores;
         try {
            const { data } = await nuevoUsuario({
               variables : {
                  input:{
                     nombre,
                     apellido,
                     email,
                     password
                  }
               }
            });
            console.log(data);
            // Usuario creado correctamente
            setMensaje(`Se creo correctamente el Usuario : ${data.nuevoUsuario.nombre}`);
            setTimeout(()=>{
               setMensaje(null);
               // Redirigir usuario para iniciar Sesion
               router.push('/login');
            },3000)


         } catch (error) {
            setMensaje(error.message.replace('ApolloError:' , ''));
            console.log(error)
            setTimeout(()=>{
               setMensaje(null);
            },3000);
         };
      }
   });

   // if ( loading ) return 'Cargando...';
   const mostrarMensaje = ( ) => {
      return (
         <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
            <p>{mensaje}</p>
         </div>
      );
   };


   return (
   <div>
      <Layout>
         {/*  ---- error  */}
         { mensaje && mostrarMensaje()}
         <h1 className='text-center text-2xl text-white font-light'>Crear Nueva Cuenta</h1>
         <div className='flex justify-center mt-5'>
            <div className='w-full max-w-sm'>
               <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit}>
                  {/* ====== NOMBRE INPUT */}
                  <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2 ' htmlFor='nombre'>
                           Nombre
                        </label>
                        <input
                           className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                           id="nombre"
                           type="text"
                           placeholder='Nombre'
                           
                           value={formik.values.nombre}
                           onChange = {formik.handleChange}
                           onBlur = { formik.handleBlur }
                        />
                     </div>
                     {/*  ------ VALIDATE NOMBRE ------ */}
                     { formik.touched.nombre && formik.errors.nombre ? (
                        <div className='bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-2'>
                           <p className='font-bold'>Error : </p>
                           <p>{formik.errors.nombre}</p>
                        </div>
                     ) : null }
                  {/* ====== APELLIDO INPUT */}
                  <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2 ' htmlFor='apellido'>
                           Apellido
                        </label>
                        <input
                           className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                           id="apellido"
                           type="text"
                           placeholder='Apellido'

                           value={formik.values.apellido}
                           onChange = {formik.handleChange}
                           onBlur = { formik.handleBlur }
                        />
                     </div>
                     {/*  ------ VALIDATE APELLIDO ------ */}
                     { formik.touched.apellido && formik.errors.apellido ? (
                        <div className='bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-2'>
                           <p className='font-bold'>Error : </p>
                           <p>{formik.errors.apellido}</p>
                        </div>
                     ) : null }
                  {/* ====== EMAIL INPUT */}
                  <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2 ' htmlFor='email'>
                           Email
                        </label>
                        <input
                           className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                           id="email"
                           type="email"
                           placeholder='Email usuario'

                           value = { formik.values.email }
                           onChange = {formik.handleChange}
                           onBlur = { formik.handleBlur }
                        />
                     </div>
                     {/*  ------ VALIDATE EMAIL ------ */}
                     { formik.touched.email && formik.errors.email ? (
                        <div className='bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-2'>
                           <p className='font-bold'>Error : </p>
                           <p>{formik.errors.email}</p>
                        </div>
                     ) : null }
                     {/* ===== PASSWORD INPUT */}
                     <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2 ' htmlFor='password'>
                           Password
                        </label>
                        <input
                           className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                           id="password"
                           type="password"
                           placeholder='Password'

                           value = { formik.values.password }
                           onChange = {formik.handleChange}
                           onBlur = { formik.handleBlur }
                        />
                     </div>
                     {/*  ------ VALIDATE PASSWORD ------ */}
                     { formik.touched.password && formik.errors.password ? (
                        <div className='bg-red-100 my-2 border-l-4 border-red-500 text-red-700 p-2'>
                           <p className='font-bold'>Error : </p>
                           <p>{formik.errors.password}</p>
                        </div>
                     ) : null }
                  <input 
                     type="submit" 
                     className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900'
                     value="Crear Cuenta"
                  />
               </form>
            </div>
         </div>
      </Layout>
   </div>
   )
}

export default Nuevacuenta;