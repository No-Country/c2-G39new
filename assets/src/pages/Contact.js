import React from "react";

export default class Home extends React.Component {
  render() {
    return (
      <div className="container" style={{textAlign:"center"}}>
        <h1>Contacto</h1>
        <h3>Comunicate con el equipo de Crypto Shop por cualquier consulta</h3>
        <br />
        <h4><u>Matias Gonzalez</u></h4>
        <p>Desarrollador Frontend con React</p>
        <p>Correo: <i></i></p>
        <p>Linkedin: <i></i></p>
        <br />
        <h4><u>Jonatan Alcaraz</u></h4>
        <p>Desarrollador Backend con Django</p>
        <p>Correo: <i></i></p>
        <p>Linkedin: <i></i></p>
        <br />
        <h4><u>Edgar Ocampo</u></h4>
        <p>Desarrollador Full Stack con React y Django</p>
        <p>Correo: edgarocampo36@gmail.com<i></i></p>
        <p>Linkedin: edgarocampo36<i></i></p>
        <br />

      </div>
    )
  }
}