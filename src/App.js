import React,{useState} from "react";
import {Formulario, 
          Label, 
          ContenedorTerminos, 
          ContenedorBotonCentrado, 
          Boton,
          MensajeError,
          MensajeExito} from "./elements/Formularios";
 import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
  import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
  import Input from "./components/Input";
  

          const App = () => {
  
  
 
  
  const [usuario, cambiarUsuario] = useState({campo: '', valido: null});
  // const [name, cambiarNombre] = useState({campo: '', valido: null});
  const [password, cambiarPassword] = useState({campo: '', valido: null});
  const [password2, cambiarPassword2] = useState({campo: '', valido: null});
  const [correo, cambiarCorreo] = useState({campo: '', valido: null});
  // const [telefono, cambiarTelefono] = useState({campo: '', valido: null});
  const [terminos, cambiarTerminos] = useState(false);
  const [formularioValido, cambiarFormularioValido] = useState(null);
  
  const expresiones = {
  usuario: /^[a-zA-Z0-9_-]{4,16}$/, //letras en mayusculas, minusculas, numeros y guion bajo
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}/,  //letras y espacios, puede llevar acentos
  password: /^.{4,12}$/, //4 a 12 digitos
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  // telefono: /^\d{7,14}$/ //7 a 14 numeros
  }
  
  const validarPassword2 = () => {
      if(password.campo.length > 0){
        if(password.campo!==password2.campo){
    cambiarPassword2((prevState)=>{
      return{...prevState, valido:'false'}
    }) ;
    
      }else{
        cambiarPassword2((prevState)=>{
          return{...prevState, valido:'true'}
        }) ;
      }
    }
    }
    
    const onChangeTerminos = (e) => {
    cambiarTerminos(e.target.checked);
    }
    
    const onSubmit = (e) => {
      e.preventDefault();
    
      if(
        usuario.valido === 'true' && 
        // name.valido === 'true' &&
        password.valido === 'true' &&
        password2.valido === 'true' &&
        correo.valido === 'true' &&
        // telefono.valido === 'true' &&
        terminos
        ) {
          cambiarFormularioValido(true);
          cambiarUsuario({campo:'', valido: ''});
          // cambiarNombre({campo:'', valido: null});
          cambiarPassword({campo:'', valido: null});
          cambiarPassword2({campo:'', valido:'null'});
          cambiarCorreo({campo:'', valido: null});
          // cambiarTelefono({campo:'', valido: null});
        }else {
          cambiarFormularioValido(false);
        }
    }
    
      return ( 
    <main>
      <Formulario action="" onSubmit={onSubmit}>
      
      <Input
      estado={usuario}
      cambiarEstado={cambiarUsuario}
      type="text"
        label="Usuario:"
        placeholder="Usuario"
        name="Usuario"
        leyendaError="El usuario tiene que ser de 4 a 16 digitos y solo puede contener numeros, letras y guion bajo"
        expresionRegular={expresiones.usuario}
    
      />
    {/* <Input
      estado={name}
      cambiarEstado={cambiarNombre}
      type="text"
        label="Nombre:"
        placeholder="John Doe"
        name="Usuario"
        leyendaError="El nombre solo puede contener letras y espacios"
        expresionRegular={expresiones.nombre}
    
      /> */}
    
    <Input
      estado={password}
      cambiarEstado={cambiarPassword}
      type="password"
        label="Contraseña:"
        placeholder="Contraseña"
        name="password1"
        leyendaError="La contraseña debe de ser de 4 a 12 digitos."
        expresionRegular={expresiones.password}
    
      />
    
    <Input
      estado={password2}
      cambiarEstado={cambiarPassword2}
      type="password"
        label="Repetir contraseña:"
        name="password1"
        leyendaError="Ambas contraseñas deben de ser iguales."
        funcion={validarPassword2}
    
      />
    
    <Input
      estado={correo}
      cambiarEstado={cambiarCorreo}
      type="email"
        label="Correo:"
        placeholder="Correo@correo.com"
        name="correo"
        leyendaError="El correo tiene que ser de un formato valido"
        expresionRegular={expresiones.correo}
    
      />
    
    {/* <Input
      estado={telefono}
      cambiarEstado={cambiarTelefono}
      type="text"
        label="Telefono:"
        placeholder="54 376"
        name="telefono"
        leyendaError="El telefono solo puede contener numeros"
        expresionRegular={expresiones.telefono}
    
      /> */}
    
    
      
        <ContenedorTerminos>
          <Label>
          <input 
          type="checkbox" 
          name="terminos" 
          id="terminos" 
          checked={terminos}
          onChange={onChangeTerminos}
          />
          Acepto los terminos y condiciones
        </Label>
        </ContenedorTerminos>
          {formularioValido === false &&   <MensajeError>
          <p>
          <FontAwesomeIcon icon={faExclamationTriangle}/>
            <b>Error: </b>Por favor rellene el formulario correctamente.
          </p>
          </MensajeError>}
        <ContenedorBotonCentrado>
          <Boton type="submit">Enviar</Boton>
    {formularioValido === true && <MensajeExito>¡El formulario se ha  enviado exitosamente!</MensajeExito> }    
            </ContenedorBotonCentrado>
      </Formulario>
    </main>);
  }
  

 

export default App;