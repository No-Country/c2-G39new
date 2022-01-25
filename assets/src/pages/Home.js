import React from "react";
import "../components/Styles/home.css";

export default class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="container__hero">
          <div className="container__hero--title">
            <h1 className="titulo">Vision / Mision</h1>

            <p className="home">
              Crypto Check nace para poder agilizar las <br /> transacciones en
              las distintas criptomonedas <br /> de manera gratuita, sin
              comisiones de servicio.
            </p>
            <br />
          </div>

          <div className="image"> </div>
        </div>
        <div className="Iam">
          <p className="beneficios">Beneficios</p>
          <b>
            <div className="innerIam">
              Facil de usar
              <br />
              Soporte 24/7
              <br />
              Registro gratuito
              <br />
              Actualización constante
              <br />
              Que mas?
            </div>
          </b>
        </div>
      </div>
    );
  }
}
