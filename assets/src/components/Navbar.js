import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import MenuItems from "./navbar/MenuItems.js"
import "./Styles/navbar.css";
//import {Button} from '../../../src/elements/button/button.js'
import authRepository from "../api/authRepository";

const Navbar = () => {
  const isAuth = () => {
    return localStorage.getItem("user_token");
  };

  const [state, setState] = useState({ clicked: false });
  const navigate = useNavigate()

  const handleClick = () => {
    setState({ clicked: !state.clicked });
  };

  const handleLogout = () => {
    authRepository()
      .logOut()
      .then((r) => {
        alert("Usuario deslogueado. Nos vemos pronto!")
        navigate("/");
      });
  };

  if (isAuth()) {
    return (
      <nav className="navbarItems">
        <Link to="/dashboard">
          <h1 className="navbar-logo">Crypto check</h1>
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i
            className={state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>
        <ul className={state.clicked ? "nav-menu active" : "nav-menu"}>
          <Link className="nav-link" to="/dashboard">
            Home
          </Link>
          <Link className="nav-link" to="/contact">
            Contacto
          </Link>
          <a href="javascript:void(0)" onClick={handleLogout} className="nav-link logout">
            Logout
          </a>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="navbarItems">
        <Link to="/">
          <h1 className="navbar-logo">Crypto check</h1>
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i
            className={state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>
        <ul className={state.clicked ? "nav-menu active" : "nav-menu"}>
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/login">
            Login
          </Link>
          <Link className="nav-link" to="/contact">
            Contacto
          </Link>
        </ul>
      </nav>
    );
  }
};

export default Navbar;
