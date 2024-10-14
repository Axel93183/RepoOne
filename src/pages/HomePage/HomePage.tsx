// HomePage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./HomePage.css";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/services");
  };

  return (
    <div className="homepage">
      <h1>Bienvenue sur notre plateforme d'aide à domicile</h1>
      <p>Consultez nos services et réservez en ligne facilement.</p>
      <Button text="Découvrir nos services" onClick={handleGetStarted} />
    </div>
  );
};

export default HomePage;
