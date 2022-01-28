import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import authRepository from "../api/authRepository";
import styled from 'styled-components'; 
import Modal from '../components/Modal.js';
import Cryptos from '../components/Cryptos.js';



const Dashboard = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    authRepository()
      .logOut()
      .then((r) => {
        navigate("/");
      });
  };

const [estadoModal1, cambiarEstadoModal1] = useState(false);
  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  const [estadoModal3, cambiarEstadoModal3] = useState(false);
  const [estadoModal4, cambiarEstadoModal4] = useState(false);

  return (
   <> 
      <button onClick={handleClick}>Logout</button>
    <div>
      <ContenedorBotones>
        <Boton onClick={() => cambiarEstadoModal1(!estadoModal1)}>
          Compra
        </Boton>
        <Boton onClick={() => cambiarEstadoModal2(!estadoModal2)}>
          Venta
        </Boton><Boton onClick={() => cambiarEstadoModal3(!estadoModal3)}>
          Movimientos
        </Boton><Boton onClick={() => cambiarEstadoModal4(!estadoModal4)}>
          Usuario
        </Boton>
      </ContenedorBotones>
      <Modal
       estado = {estadoModal1}
       cambiarEstado = {cambiarEstadoModal1}
       titulo = "Compra"
       mostrarHeader = {true}
       mostrarOverlay = {true}
       posicionModal = {'center'}
       padding = {'20px'}
      >
        <Contenido>
        <p>Seleccione la moneda a utilizar</p>
        <select>
          <option value="1">Bitcoin BTC</option>
          <option value="2">Ethereum ETH</option> 
        </select>
        <p>Tiene disponible la cantidad de: </p>
        <p>Ingrese la cantidad de monedas a comprar: </p>

        <input type="number" placeholder="Ingrese una cantidad aquí"/>

        {/* <FormModal/> */}
        
        <Boton onClick={() => cambiarEstadoModal1(!estadoModal1)}>Enviar</Boton>
        </Contenido>
      </Modal>

      <Modal
       estado = {estadoModal2}
       cambiarEstado = {cambiarEstadoModal2}
       titulo = "Venta"
       mostrarHeader = {true}
       mostrarOverlay = {true}
       posicionModal = {'center'}
       padding = {'20px'}
      >
        <Contenido>
        <p>Seleccione la moneda a utilizar</p>
        <select>
          <option value="1">Bitcoin BTC</option>
          <option value="2">Ethereum ETH</option> 
        </select>
        <p>Tiene disponible la cantidad de: </p>
        <p>Ingrese la cantidad de monedas a vender: </p>

        <input type="number" placeholder="Ingrese una cantidad aqui"/>

        {/* <FormModal/> */}
        
        <Boton onClick={() => cambiarEstadoModal1(!estadoModal1)}>Enviar</Boton>
        </Contenido>
      </Modal>

      <Modal
       estado = {estadoModal3}
       cambiarEstado = {cambiarEstadoModal3}
       titulo = "Ultimos movimientos"
       mostrarHeader = {true}
       mostrarOverlay = {true}
       posicionModal = {'center'}
       padding = {'20px'}
      >
        <Contenido>
        <ol>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ol>

        {/* <FormModal/> */}
        
        <Boton onClick={() => cambiarEstadoModal1(!estadoModal1)}>Enviar</Boton>
        </Contenido>
      </Modal>

      <Modal
       estado = {estadoModal4}
       cambiarEstado = {cambiarEstadoModal4}
       titulo = "Usuario"
       mostrarHeader = {true}
       mostrarOverlay = {true}
       posicionModal = {'center'}
       padding = {'20px'}
      >
        <Contenido>
        <p>Nombre de usuario:</p>
        
        <p>Correo: </p>

        {/* <FormModal/> */}
        
        </Contenido>
      </Modal>
    </div>
    <div> 

    <Cryptos/>

</div>
</>
  );
};

export default Dashboard;


const ContenedorBotones = styled.div`
padding: 20px;
display: flex;
flex-wrap: wrap;
justify-content: center;
gap: 20px;
`;

const Boton = styled.button`
display: block;
padding: 10px 30px;
border-radius: 100px;
color: #fff;
border: none;
background: #18a724;
cursor: pointer;
font-family: 'Roboto' sans-serif;
font-weight: 500;
transition: .3s ease all;

&:hover{
  background: #000000;
}
`;

const Contenido = styled.div`
display: flex;
flex-direction: column;
align-items: center;

h1{
  font-size:42px;
  font-weight: 700;
  margin-bottom: 10px;
}

p{
  font-size: 18px;
  margin-bottom: 20px;
  color:#18a724;
}

img{
  width: 100%;
  vertical-align: top;
  border-radius: 3px;
}

input{
  padding: 10px;
  margin-bottom: 10px;
  color: #fff;
  background: #000000;
  text-align: center;
  font-weight: bold;

}

select{
  margin-bottom: 10px;
  color: #fff;
  background: #18a724;
  text-align: center; 
  font-weight: bold;
  padding: 10px;
}

li{
  color: #00b347;
}
`;