import React, { useState } from "react";
import "./ContactForm.css";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  //   const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Données du formulaire envoyées :", formData);

    // try {
    //   const response = await fetch("/api/contact", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(formData),
    //   });

    //   if (response.ok) {
    //     setStatus("success");
    //     setFormData({ name: "", email: "", message: "" });
    //   } else {
    //     setStatus("error");
    //   }
    // } catch (error) {
    //   console.error("Erreur lors de l'envoi :", error);
    //   setStatus("error");
    // }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <label>
        Nom:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Message:
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Envoyer</button>

      {/* {status === "success" && (
        <p className="success-message">Message envoyé avec succès !</p>
      )}
      {status === "error" && (
        <p className="error-message">
          Erreur lors de l'envoi. Veuillez réessayer.
        </p>
      )} */}
    </form>
  );
};

export default ContactForm;
