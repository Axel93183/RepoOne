import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import image1 from "../../assets/images/image-accueil-1.jpg";
import "./HomePage.css";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/services");
  };

  return (
    <div className="homepage">
      {/* Section d'en-tête */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Des services d'aide à domicile simplifiés</h1>
          <p>
            Profitez de nos services d'aide à domicile sans avance de frais,
            grâce au crédit d'impôt immédiat. Réservez dès aujourd'hui et
            simplifiez votre quotidien.
          </p>
          <Button text="Découvrir nos services" onClick={handleGetStarted} />
        </div>
        <div className="hero-image">
          <img src={image1} alt="Aide à domicile" />
        </div>
      </section>

      {/* Section Avantages */}
      <section className="benefits-section">
        <h2>Pourquoi choisir notre plateforme ?</h2>
        <div className="benefits-grid">
          <div className="benefit-item">
            <img src="/assets/no-advance.png" alt="Crédit d'impôt immédiat" />
            <h3>Crédit d'impôt immédiat</h3>
            <p>
              Aucun frais à avancer. Profitez immédiatement des réductions
              fiscales pour vos services d'aide à domicile.
            </p>
          </div>
          <div className="benefit-item">
            <img src="/assets/easy-booking.png" alt="Réservation facile" />
            <h3>Réservation facile</h3>
            <p>
              Réservez en ligne en quelques clics grâce à notre interface
              intuitive et choisissez le prestataire qui vous convient.
            </p>
          </div>
          <div className="benefit-item">
            <img
              src="/assets/trusted-providers.png"
              alt="Prestataires qualifiés"
            />
            <h3>Prestataires qualifiés</h3>
            <p>
              Sélectionnez parmi une équipe de professionnels qualifiés et
              évalués par nos clients pour garantir la meilleure qualité de
              service.
            </p>
          </div>
        </div>
      </section>

      {/* Section Services */}
      <section className="services-section">
        <h2>Nos Services</h2>
        <p>
          Découvrez notre large gamme de prestations éligibles au crédit d'impôt
          : ménage, garde d'enfants, assistance aux seniors, et bien plus
          encore.
        </p>
        <Button text="Voir tous les services" onClick={handleGetStarted} />
      </section>

      {/* Section Témoignages */}
      <section className="testimonials-section">
        <h2>Ce que disent nos clients</h2>
        <div className="testimonials-grid">
          <div className="testimonial-item">
            <p>
              "Grâce à cette plateforme, nous avons trouvé une aide-ménagère
              fiable sans avoir à avancer de frais. C'est un vrai soulagement !"
            </p>
            <h4>- Sophie L.</h4>
          </div>
          <div className="testimonial-item">
            <p>
              "L'automatisation du crédit d'impôt est une révolution. Je
              recommande vivement ce service à toutes les familles."
            </p>
            <h4>- Paul M.</h4>
          </div>
          <div className="testimonial-item">
            <p>"Merci pour votre professionnalisme et votre efficacité."</p>
            <h4>- Adam C.</h4>
          </div>
        </div>
      </section>

      {/* Section CTA (Call to Action) */}
      <section className="cta-section">
        <h2>Commencez dès maintenant</h2>
        <p>
          Rejoignez des centaines de clients satisfaits et simplifiez votre
          quotidien avec nos services d'aide à domicile.
        </p>
        <Button text="Découvrir nos services" onClick={handleGetStarted} />
      </section>
    </div>
  );
};

export default HomePage;
