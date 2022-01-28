import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  obtenerMontoUsuario,
  modificarMontoUsuario,
} from "../api/walletAdapter";
import getDataFromGecko from "../api/coingeckoAdapter";
import Modal from "../components/Modal.js";
import Cryptos from "../components/Cryptos.js";

const Dashboard = () => {
  const [monto, setMonto] = useState();
  const [coins, setCoins] = useState([])
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  const [estadoModal3, cambiarEstadoModal3] = useState(false);
  const [estadoModal4, cambiarEstadoModal4] = useState(false);

  obtenerMontoUsuario("1").then((r) => {
    setMonto(r);
  });

  const handleClickCompra = () => {
    modificarMontoUsuario("1", "8000").then((r) => {
      setMonto(r.monto);
      alert("Operacion exitosa");
    });
  };

  const [select, setSelect] = useState("bitcoin")
  const [precioSelect, setPrecioSelect] = useState()
  const handleSelect = (e) => {
    if (e.target.value !== "default") {
      const coinData = coins.find( coin => coin.id === e.target.value)
      setSelect(e.target.value)
      setPrecioSelect(coinData.current_price)
    }else{
      setSelect("*******")
      setPrecioSelect()
    }
  }

  useEffect(() => {
    getDataFromGecko().then(r => setCoins(r));
  }, []);

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <h2>
        Monto del usuario: <span>{monto}</span>
      </h2>
      <ContenedorBotones>
        <Boton onClick={() => cambiarEstadoModal1(!estadoModal1)}>Compra</Boton>
        <Boton isRed onClick={() => cambiarEstadoModal2(!estadoModal2)}>Venta</Boton>
        {/* <Boton onClick={() => cambiarEstadoModal3(!estadoModal3)}>
          Movimientos
        </Boton>
        <Boton onClick={() => cambiarEstadoModal4(!estadoModal4)}>
          Usuario
        </Boton> */}
      </ContenedorBotones>
      <Modal
        estado={estadoModal1}
        cambiarEstado={cambiarEstadoModal1}
        titulo="Compra"
        mostrarHeader={true}
        mostrarOverlay={true}
        posicionModal={"center"}
        padding={"20px"}
      >
        <Contenido>
          <p>Seleccione la moneda a utilizar</p>
          <select value={select.value} onChange={handleSelect}>
            <option value="default">-----------</option>
            <option value="bitcoin">Bitcoin BTC</option>
            <option value="ethereum" >Ethereum ETH</option>
          </select>
        
          <p>Tiene disponible la cantidad de: ${monto} ars</p>
          <p>Precio de {select}: ${precioSelect} ars</p>
          <p>Ingrese la cantidad de monedas a comprar: </p>

          <input type="number" placeholder="Ingrese una cantidad aquí" />

          

          <Boton className="compra" onClick={() => cambiarEstadoModal1(!estadoModal1)}>
            Enviar
          </Boton>
        </Contenido>
      </Modal>

      <Modal
        isRed="red"
        estado={estadoModal2}
        cambiarEstado={cambiarEstadoModal2}
        titulo="Venta"
        mostrarHeader={true}
        mostrarOverlay={true}
        posicionModal={"center"}
        padding={"20px"}
      >
        <Contenido isRed>
          <p>Seleccione la moneda a utilizar</p>
          <select value={select.value} onChange={handleSelect}>
            <option value="default">-----------</option>
            <option value="bitcoin">Bitcoin BTC</option>
            <option value="ethereum" >Ethereum ETH</option>
          </select>
        
          <p>Tiene disponible la cantidad de: ${monto} ars</p>
          <p>Precio de {select}: ${precioSelect} ars</p>
          <p>Ingrese la cantidad de monedas a vender: </p>

          <input type="number" placeholder="Ingrese una cantidad aqui" />

          

          <Boton isRed onClick={() => cambiarEstadoModal1(!estadoModal1)}>
            Enviar
          </Boton>
        </Contenido>
      </Modal>

      {/* Funcionalidad de MOVIMIENTOS a desarrollar */}

{/*       <Modal
        estado={estadoModal3}
        cambiarEstado={cambiarEstadoModal3}
        titulo="Ultimos movimientos"
        mostrarHeader={true}
        mostrarOverlay={true}
        posicionModal={"center"}
        padding={"20px"}
      >
        <Contenido>
          <ol>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ol>
 
          

          <Boton onClick={() => cambiarEstadoModal1(!estadoModal1)}>
            Enviar
          </Boton>
        </Contenido>
      </Modal>
      */}

      {/* Funcionalidad de DATOS USUARIO a desarrollar */}

      {/* <Modal
        estado={estadoModal4}
        cambiarEstado={cambiarEstadoModal4}
        titulo="Usuario"
        mostrarHeader={true}
        mostrarOverlay={true}
        posicionModal={"center"}
        padding={"20px"}
      >
        <Contenido>
          <p>Nombre de usuario:</p>

          <p>Correo: </p>

          
        </Contenido>
      </Modal> */}

      <Cryptos coins={coins} />
    </div>
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
  background: ${props => (!props.isRed ? "#18a724" : "red")};
  border: none;
  cursor: pointer;
  font-family: "Roboto" sans-serif;
  font-weight: 500;
  transition: 0.3s ease all;

  &:hover {
    background: #000000;
  }
`;

const Contenido = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 42px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  p {
    font-size: 18px;
    margin-bottom: 20px;
    color: ${props => (!props.isRed ? "#18a724" : "red")};
  }
  img {
    width: 100%;
    vertical-align: top;
    border-radius: 3px;
  }
  input {
    padding: 10px;
    margin-bottom: 10px;
    color: #fff;
    background: #000000;
    text-align: center;
    font-weight: bold;
  }
  select {
    margin-bottom: 10px;
    color: #fff;
    background: ${props => (!props.isRed ? "#18a724" : "red")};
    text-align: center;
    font-weight: bold;
    padding: 10px;
  }
  li {
    color: #00b347;
  }
`;
