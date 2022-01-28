import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Registro from "../pages/Registro";
import Login from "../pages/Login";
import Contact from "../pages/Contact";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Registro />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
