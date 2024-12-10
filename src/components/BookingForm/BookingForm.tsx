import React, { useEffect, useState } from "react";
import "./BookingForm.css";

interface BookingFormProps {
  prefilledData?: {
    title: string;
    description: string;
  };
}

const BookingForm: React.FC<BookingFormProps> = ({ prefilledData }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    comments: "",
  });

  useEffect(() => {
    if (prefilledData) {
      setFormData((prev) => ({
        ...prev,
        title: prefilledData.title,
        description: prefilledData.description,
      }));
    }
  }, [prefilledData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Réservation soumise :", formData);
    alert("Réservation enregistrée !");
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      {/* Prestation */}
      <div>
        <label htmlFor="title">Prestation</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Nom de la prestation"
          readOnly={!!prefilledData} // Lecture seule si prérempli
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description de la prestation"
          readOnly={!!prefilledData} // Lecture seule si prérempli
        />
      </div>

      {/* Nom complet */}
      <div>
        <label htmlFor="fullName">Nom complet</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Votre nom complet"
          required
        />
      </div>

      {/* E-mail */}
      <div>
        <label htmlFor="email">Adresse e-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Votre adresse e-mail"
          required
        />
      </div>

      {/* Téléphone */}
      <div>
        <label htmlFor="phone">Numéro de téléphone</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Votre numéro de téléphone"
          required
        />
      </div>

      {/* Adresse */}
      <div>
        <label htmlFor="address">Adresse de prestation</label>
        <input
          id="address"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
          placeholder="Adresse où la prestation doit être réalisée"
          required
        />
      </div>

      {/* Date */}
      <div>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      {/* Heure */}
      <div>
        <label htmlFor="time">Heure</label>
        <input
          id="time"
          name="time"
          type="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>

      {/* Commentaires */}
      <div>
        <label htmlFor="comments">Commentaires supplémentaires</label>
        <textarea
          id="comments"
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          placeholder="Indiquez vos besoins ou informations complémentaires"
        />
      </div>

      {/* Bouton de soumission */}
      <button type="submit">Réserver</button>
    </form>
  );
};

export default BookingForm;
