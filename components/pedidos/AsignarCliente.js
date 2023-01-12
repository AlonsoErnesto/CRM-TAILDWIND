import React,{useState, useEffect} from 'react'
import Select from 'react-select';


const clientes = [
   { id: 1, nombre: 'Pamela' },
   { id: 2, nombre: 'Cristina' },
   { id: 3, nombre: 'Valeria' }
];



const AsignarCliente = () => {

   const [cliente, setCliente] = useState([]);
   useEffect(() => {
      console.log(cliente)
   }, [cliente]);

   const selecionarCliente = clientes => {
      setCliente(clientes);
   }


   return (
      <Select
         options={clientes}
         isMulti={true}
         onChange={opcion=>selecionarCliente(opcion)}
         getOptionValue = { opciones => opciones.id}
         getOptionLabel = { opciones => opciones.nombre}
         placeholder="Seleccione el cliente"
         noOptionsMessage={()=>'No hay resultados.'}
      />
   )
}

export default AsignarCliente;