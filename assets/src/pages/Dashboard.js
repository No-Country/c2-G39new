import React from "react";
import { useNavigate } from "react-router-dom";
import authRepository from "../api/authRepository";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    authRepository()
      .logOut()
      .then((r) => {
        navigate("/");
      });
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

export default Dashboard;
