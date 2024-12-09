import React from "react";
import { useNavigate } from "react-router-dom";

import BenefitItem from "../../components/BenefitItem/BenefitItem";
import Button from "../../components/Button/Button";
import Testimonial from "../../components/TestimonialItem/TestimonialItem";

import iconChat from "../../assets/icons/icon-chat.png";
import iconEasy from "../../assets/icons/icon-easy.png";
import iconHandshake from "../../assets/icons/icon-handshake.png";
import iconMoney from "../../assets/icons/icon-money.png";
import iconShield from "../../assets/icons/icon-security.png";
import image1 from "../../assets/images/image-accueil-1.jpg";

import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";
import "./HomePage.css";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/services");
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <div className="homepage">
      {/* Section d'en-tête */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Des services d'aide à la personne simplifiés</h1>
          <p>
            Profitez de nos services d'aide à la personne et payer que 50% du
            montant de la prestation, grâce à l'
            <span>avance immédiate de crédit d'impôt</span>. Réservez dès
            aujourd'hui et simplifiez votre quotidien.
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
          <BenefitItem
            icon={iconMoney}
            altText="icon d'argent"
            title="Crédit d'impôt immédiat"
            description="Profitez immédiatement des réductions fiscales pour vos services d'aide à domicile."
          />
          <BenefitItem
            icon={iconEasy}
            altText="icon doigt qui clique"
            title="Réservation facile"
            description="Réservez en ligne en quelques clics grâce à notre interface intuitive et choisissez le prestataire qui vous convient."
          />
          <BenefitItem
            icon={iconHandshake}
            altText="icon poignée de mains"
            title="Prestataires qualifiés"
            description="Sélectionnez parmi une équipe de professionnels qualifiés et
              évalués par nos clients pour garantir la meilleure qualité de
              service."
          />
          <BenefitItem
            icon={iconShield}
            altText="icon bouclier"
            title="Service sécurisé"
            description="Réalisation, accompagnement et suivi des démarches auprès de l'Urssaf pour bénéficier de l'avance immédiate."
          />
          <BenefitItem
            icon={iconChat}
            altText="icon chatbot"
            title="Contact simplifié"
            description="Contactez nous facilement via le formulaire sur notre site. De plus, un Assistant Virtuel est à votre disposition pour répondre à vos questions les plus fréquentes."
          />
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
          <Testimonial
            quote="L'automatisation du crédit d'impôt est une révolution. Je recommande vivement ce service à toutes les familles."
            author="Paul M."
          />
          <Testimonial
            quote="Grâce à cette plateforme, nous avons trouvé une aide-ménagère
                fiable pour la moitié de son tarif. C'est un vrai soulagement !"
            author="Sophie L."
          />
          <Testimonial
            quote="Merci pour votre professionnalisme et votre efficacité."
            author="Adam C."
          />
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

      <ScrollToTopButton />
    </div>
  );
};

export default HomePage;
