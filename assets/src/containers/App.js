import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import Registro from "../views/Registro";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registro />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;