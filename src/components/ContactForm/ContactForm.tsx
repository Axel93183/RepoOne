import React, { useState } from "react";
import "./ContactForm.css";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const validateField = (name: string, value: string): string => {
    if (name === "name" && !/^[a-zA-Z\s-]+$/.test(value)) {
      return "Le nom contient des caractères invalides. Seuls les lettres, espaces et tirets sont autorisés.";
    }
    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      return "Adresse email invalide.";
    }
    if (name === "message" && !value.trim()) {
      return "Le message ne peut pas être vide.";
    }
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { ...errors };
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      newErrors[key as keyof typeof errors] = error;
    });

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) {
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
        setFormData({ name: "", email: "", message: "" });
        setErrors({ name: "", email: "", message: "" });
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
      <label>
        Nom:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error-message">{errors.name}</p>}
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </label>
      <label>
        Message:
        <textarea
          name="message"
          value={formData.message}
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
          Erreur lors de l'envoi. Veuillez réessayer.
        </p>
      )}
    </form>
  );
};

export default ContactForm;
