import React from "react";
import "./ServicesPage.css";

const ServicesPage: React.FC = () => {
  return (
    <div className="services-page">
      <h1>Nos Services</h1>
      <div className="services-list">
        <div className="service-item">
          <h2>Entretien ménager</h2>
          <p>Nous vous aidons à maintenir votre maison propre et ordonnée.</p>
        </div>
        <div className="service-item">
          <h2>Garde d'enfants</h2>
          <p>Service de garde à domicile pour vos enfants en toute sécurité.</p>
        </div>
        <div className="service-item">
          <h2>Aide aux personnes âgées</h2>
          <p>Assistance quotidienne pour les personnes âgées ou dépendantes.</p>
        </div>
        {/* Ajoutez d'autres services ici */}
      </div>
    </div>
  );
};

export default ServicesPage;
