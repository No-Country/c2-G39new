import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Formulario,
  ContenedorBotonCentrado,
  Boton,
} from "../elements/Formularios";
import Input from "../components/Input";
import authRepository from "../api/authRepository";
import "../components/Styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [usuario, cambiarUsuario] = useState({ campo: "", valido: null });
  const [password, cambiarPassword] = useState({ campo: "", valido: null });

/*   const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, //letras en mayusculas, minusculas, numeros y guion bajo
    password: /^.{4,12}$/, //4 a 12 digitos
  }; */

  const onSubmit = (e) => {
    e.preventDefault();

    /*     if (
      usuario.valido === "true" &&
      password.valido === "true" 
    ) { */
    const user = {
      username: usuario.campo,
      password: password.campo,
    };
    authRepository()
      .logIn(user)
      .then((r) => {
        navigate("/dashboard");
      })
      .catch((e) => alert("Usuario o contraseña incorrecta"));

    cambiarUsuario({ campo: "", valido: null });
    cambiarPassword({ campo: "", valido: null });
    /* } */
  };
  return (
    <main>
      <Formulario action="form-general" onSubmit={onSubmit}>
        <Input
          estado={usuario}
          cambiarEstado={cambiarUsuario}
          type="text"
          label="Usuario:"
          placeholder="Usuario"
          name="usuario"
          //leyendaError="Usuario incorrecto"
          //expresionRegular={expresiones.usuario}
        />
        <Input
          estado={password}
          cambiarEstado={cambiarPassword}
          type="password"
          label="Contraseña:"
          placeholder="Contraseña"
          name="password"
          //leyendaError="Contraseña incorrecta."
          //expresionRegular={expresiones.password}
        />
        <ContenedorBotonCentrado>
          <Boton type="submit">Enviar</Boton>
        </ContenedorBotonCentrado>
      </Formulario>

      <h1 className="form-registro">
        ¿Todavía no te registraste? ¡Completá nuestro formulario de "
        <Link to="/register" className="Link">
          Registro
        </Link>
        " y sumate!
      </h1>
    </main>
  );
};

export default Login;
