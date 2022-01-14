import React from "react";
import { Link } from "react-router-dom";


export default class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Home</h1>
        <br />
        <h2>Registrate</h2>
        <Link to="/register">
          Regitro
        </Link>
      </div>

    )
  }
}