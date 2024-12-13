import React, { useEffect, useState } from "react";
import { servicesData } from "../../data/servicesData";
import DropdownFilter from "../DropdownFilter/DropdownFilter";
import "./BookingForm.css";

interface BookingFormProps {
  prefilledData?: {
    title: string;
    description: string;
  };
}

// Utilise `flatMap` pour aplatir les données de `servicesData` pour obtenir une liste unique de tous les services
// Chaque service est associé à son titre, sa catégorie et sa description.
const allServices = servicesData.flatMap((cat) =>
  cat.services.map((srv) => ({
    title: srv.title,
    category: cat.category,
    description: srv.description,
  }))
);

const BookingForm: React.FC<BookingFormProps> = ({ prefilledData }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");

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
      const service = allServices.find(
        (srv) => srv.title === prefilledData.title
      );

      setSelectedCategory(service?.category || "");
      setSelectedService(prefilledData.title || "");
      setFormData((prev) => ({
        ...prev,
        category: service?.category || "",
        title: prefilledData.title || "",
        description: prefilledData.description || "",
      }));
    }
  }, [prefilledData]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSelectedService("");
    setFormData((prev) => ({
      ...prev,
      category,
      title: "",
      description: "",
    }));
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const serviceTitle = e.target.value;
    const service = allServices.find((srv) => srv.title === serviceTitle);

    setSelectedService(serviceTitle);
    setSelectedCategory(service?.category || "");
    setFormData((prev) => ({
      ...prev,
      category: service?.category || "",
      title: serviceTitle,
      description: service?.description || "",
    }));
  };

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

  const filteredServices = selectedCategory
    ? allServices.filter((srv) => srv.category === selectedCategory)
    : allServices;

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <div className="dropdowns">
        {/* Dropdown - Categories */}
        <DropdownFilter
          options={servicesData.map((cat) => cat.category)}
          selectedOption={selectedCategory}
          handleChange={handleCategoryChange}
          label="Catégories"
          defaultOptionLabel="Toutes les catégories"
        />

        {/* Dropdown - Services */}
        <DropdownFilter
          options={filteredServices.map((srv) => srv.title)}
          selectedOption={selectedService}
          handleChange={handleServiceChange}
          label="Services"
          defaultOptionLabel="Tous les services"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description">Description</label>
        <div id="description" className="description-text">
          {formData.description || "Description de la prestation"}
        </div>
      </div>

      {/* FullName */}
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

      {/* Email */}
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

      {/* Phone */}
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

      {/* Address */}
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

      {/* Time */}
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

      {/* Comments */}
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

      {/* Submit */}
      <button type="submit">Réserver</button>
    </form>
  );
};

export default BookingForm;
