import {React, useState} from 'react'
import { useFormik } from 'formik';
import * as Yup from 'Yup';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';

//Components
import Layout from '../components/Layout';


const AUTENTICAR_USUARIO = gql`
mutation autenticarUsuario($input: AutenticarInput) {
   autenticarUsuario(input: $input) {
      token
   }
}
`;


const Login = () => {

   // Routing
   const router = useRouter();

   // Mensajes
   const [mensaje, setMensaje] = useState(null);

   // Mutation para crear nuevos usuarios en apollo
   const [ autenticarUsuario ] = useMutation(AUTENTICAR_USUARIO);

   const formik = useFormik({
      initialValues : {
         email : '',
         password : ''
      },
      validationSchema : Yup.object({
         email: Yup.string().required('Complete el email.').email('Ingrese un email valido.'),
         password:Yup.string().required('Complete el password.'),
      }),
      onSubmit : async valores => {

         const { email, password } = valores; 
         try {
            const { data } = await autenticarUsuario({
               variables : {
                  input: {
                     email,
                     password
                  }
               }
            });
            console.log(data);
            setMensaje('Iniciando Sesion...');
            // Guardar el token en localstorage
            const { token } = data.autenticarUsuario;
            localStorage.setItem('token',token);
            //Redireccionar hacia clientes
            setTimeout(()=>{
               setMensaje(null);
               router.push('/');
            },2000);
         } catch (err) {
            setMensaje(err.message.replace('ApolloError:' , ''));
            setTimeout(()=>{
               setMensaje(null);
            },3000);
         }
      }
   });


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
         <h1 className='text-center text-2xl text-white font-light'>Login</h1>
         { mensaje && mostrarMensaje()}
         <div className='flex justify-center mt-5'>
            <div className='w-full max-w-sm'>
               <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit}>
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

                           value={ formik.values.password }
                           onChange={ formik.handleChange}
                           onBlur = {formik.handleBlur}
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
                     value="Iniciar Sesion"
                  />
               </form>
            </div>
         </div>
      </Layout>
   </div>
   )
}

export default Login;