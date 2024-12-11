import React, { useEffect, useState } from "react";
import DropdownFilter from "../DropdownFilter/DropdownFilter";
import { servicesData } from "../../data/servicesData";
import "./BookingForm.css";

interface BookingFormProps {
  prefilledData?: {
    title: string;
    description: string;
  };
}

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
      const category = servicesData.find((cat) =>
        cat.services.some((srv) => srv.title === prefilledData.title)
      )?.category;

      setSelectedCategory(category || "");
      setSelectedService(prefilledData.title || "");
      setFormData((prev) => ({
        ...prev,
        category: category || "",
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
    const service = servicesData
      .find((cat) => cat.category === selectedCategory)
      ?.services.find((srv) => srv.title === serviceTitle);

    setSelectedService(serviceTitle);
    setFormData((prev) => ({
      ...prev,
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

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      {/* Prestation */}
      <DropdownFilter
        options={servicesData.map((cat) => cat.category)}
        selectedOption={selectedCategory}
        handleChange={handleCategoryChange}
        label="Catégorie"
      />

      {selectedCategory && (
        <DropdownFilter
          options={
            servicesData
              .find((cat) => cat.category === selectedCategory)
              ?.services.map((srv) => srv.title) || []
          }
          selectedOption={selectedService}
          handleChange={handleServiceChange}
          label="Service"
        />
      )}

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description de la prestation"
          readOnly
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
