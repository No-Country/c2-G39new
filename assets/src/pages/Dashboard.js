import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authRepository from "../api/authRepository";
import {
  obtenerMontoUsuario,
  modificarMontoUsuario,
} from "../api/walletAdapter";

/* const obtenerMonto = async () => {
  const resp = await axios.get("http://127.0.0.1:8000/api/wallets/1")
  console.log(resp)
} */

const Dashboard = () => {
  const [monto, setMonto] = useState();

  obtenerMontoUsuario("1").then((r) => {
    setMonto(r);
  });

  const navigate = useNavigate();

  const handleClickCompra = () => {
    modificarMontoUsuario("1", "8000").then(r => {
      setMonto(r.monto)
      alert("Operacion exitosa")
    })
  }

  const handleLogout = () => {
    authRepository()
      .logOut()
      .then((r) => {
        navigate("/");
      });
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <h2>
        Monto del usuario: <span>{monto}</span>
        <button onClick={handleClickCompra}>Comprar</button>
      </h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
