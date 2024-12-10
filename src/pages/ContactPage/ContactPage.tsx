import React from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import "./ContactPage.css";

const Contact: React.FC = () => {
  return (
    <div className="contact-page">
      <h1>Contactez-nous</h1>
      <p>
        Si vous avez des questions ou souhaitez plus d'informations sur nos
        services, veuillez nous envoyer un message via le formulaire ci-dessous.
      </p>
      <ContactForm />
    </div>
  );
};

export default Contact;
