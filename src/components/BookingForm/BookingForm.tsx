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

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

  const [errors, setErrors] = useState({
    title: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    date: "",
    time: "",
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

  const validateField = (name: string, value: string): string => {
    if (name === "title" && !value.trim()) {
      return "Veuillez sélectionner la prestation de votre choix.";
    } else if (name === "fullName" && !/^[a-zA-Z\s-]+$/.test(value)) {
      return "Le nom complet doit contenir uniquement des lettres, des espaces ou des tirets.";
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      return "Une adresse e-mail valide est requise.";
    } else if (name === "phone" && !/^\+?[0-9]{7,15}$/.test(value)) {
      return "Un numéro de téléphone valide est requis.";
    } else if (name === "address" && !value.trim()) {
      return "L'adresse est requise.";
    } else if (name === "date" && !value.trim()) {
      return "Une date valide est requise.";
    } else if (name === "time" && !/^([01]\d|2[0-3]):?([0-5]\d)$/.test(value)) {
      return "Une heure valide est requise.";
    }
    return "";
  };

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

    const error = validateField("title", serviceTitle);
    setErrors((prev) => ({ ...prev, title: error }));
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

    const newErrors: typeof errors = { ...errors };

    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value as string);
      newErrors[key as keyof typeof errors] = error;
    });

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) {
      return;
    }

    setErrors({
      title: "",
      fullName: "",
      email: "",
      phone: "",
      address: "",
      date: "",
      time: "",
    });

    const dataToSend = {
      ...formData,
      category: selectedCategory,
      description: formData.description,
    };

    try {
      const response = await fetch("http://localhost:5000/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrors((prev) => ({
          ...prev,
          api: data.errors.map((err: any) => err.msg).join(", "),
        }));
        setStatus("error");
        return;
      }

      const data = await response.json();
      setPreviewUrl(data.previewUrl);
      setStatus("success");
      setFormData({
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
      setSelectedCategory("");
      setSelectedService("");
    } catch (error) {
      console.error("Booking request failed:", error);
    }
  };

  const filteredServices = selectedCategory
    ? allServices.filter((srv) => srv.category === selectedCategory)
    : allServices;

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <div className="dropdowns">
        {/* Dropdown - Categories */}
        <DropdownFilter
          id="category-filter"
          options={servicesData.map((cat) => cat.category)}
          selectedOption={selectedCategory}
          handleChange={handleCategoryChange}
          label="Catégories"
          defaultOptionLabel="Toutes les catégories"
        />

        {/* Dropdown - Services */}
        <DropdownFilter
          id="services-filter"
          options={filteredServices.map((srv) => srv.title)}
          selectedOption={selectedService}
          handleChange={handleServiceChange}
          label="Services"
          defaultOptionLabel="Tous les services"
        />
      </div>
      {errors.title && (
        <p className="error-message-service-title">{errors.title}</p>
      )}

      {/* Description */}
      <div>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          value={formData.description || "Description de la prestation"}
          onChange={handleChange}
          className="description-text"
          placeholder="Description de la prestation"
          readOnly
        />
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
        />
        {errors.fullName && <p className="error-message">{errors.fullName}</p>}
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
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
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
        />
        {errors.phone && <p className="error-message">{errors.phone}</p>}
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
        />
        {errors.address && <p className="error-message">{errors.address}</p>}
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
        />
        {errors.date && <p className="error-message">{errors.date}</p>}
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
        />
        {errors.time && <p className="error-message">{errors.time}</p>}
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

      {status === "success" && (
        <>
          <p className="success-message">Réservation envoyée avec succès !</p>
          {previewUrl && (
            <p className="preview-url">
              Aperçu de l'email :
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

export default BookingForm;
