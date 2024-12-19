import React, { useState } from "react";
import "./ContactForm.css";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    lastName: "",
    firstName: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const validateField = (name: string, value: string): string => {
    if (name === "lastName" && !/^[a-zA-Z\s-]+$/.test(value)) {
      return "Le nom contient des caractères invalides. Seuls les lettres, espaces et tirets sont autorisés.";
    }
    if (name === "firstName" && !/^[a-zA-Z\s-]+$/.test(value)) {
      return "Le prénom contient des caractères invalides. Seuls les lettres, espaces et tirets sont autorisés.";
    }
    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      return "Adresse email invalide.";
    }
    if (name === "message" && !value.trim()) {
      return "Le message ne peut pas être vide.";
    }
    return "";
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus("idle");

    const newErrors = { ...errors };
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      newErrors[key as keyof typeof errors] = error;
    });

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) {
      setStatus("error");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setPreviewUrl(data.previewUrl);
        setStatus("success");
        setFormData({ lastName: "", firstName: "", email: "", message: "" });
        setErrors({ lastName: "", firstName: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="full-name">
        <label className="last-name">
          Nom
          <input
            name="lastName"
            type="text"
            value={formData.lastName}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Votre nom"
          />
          {errors.lastName && (
            <p className="error-message">{errors.lastName}</p>
          )}
        </label>

        <label className="first-name">
          Prénom
          <input
            name="firstName"
            type="text"
            value={formData.firstName}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Votre prénom"
          />
          {errors.firstName && (
            <p className="error-message">{errors.firstName}</p>
          )}
        </label>
      </div>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </label>
      <label>
        Message:
        <textarea
          name="message"
          value={formData.message}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {errors.message && <p className="error-message">{errors.message}</p>}
      </label>
      <button type="submit">Envoyer</button>

      {status === "success" && (
        <>
          <p className="success-message">Message envoyé avec succès !</p>
          {previewUrl && (
            <p className="preview-url">
              Aperçu du message :
              <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                {previewUrl}
              </a>
            </p>
          )}
        </>
      )}
      {status === "error" && (
        <p className="error-message">
          Erreur lors de l'envoi. Veuillez réessayer s'il vous plaît.
        </p>
      )}
    </form>
  );
};

export default ContactForm;
