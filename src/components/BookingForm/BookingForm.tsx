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
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    comments: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    address: "",
    date: "",
    time: "",
  });

  const getTodayDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

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
    } else if (name === "lastName" && !/^[a-zA-Z\s-]+$/.test(value)) {
      return "Le nom doit contenir uniquement des lettres, des espaces ou des tirets.";
    } else if (name === "firstName" && !/^[a-zA-Z\s-]+$/.test(value)) {
      return "Le prénom doit contenir uniquement des lettres, des espaces ou des tirets.";
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      return "Une adresse e-mail valide est requise.";
    } else if (name === "phone" && !/^\+?[0-9]{7,15}$/.test(value)) {
      return "Un numéro de téléphone valide est requis.";
    } else if (name === "address" && !value.trim()) {
      return "L'adresse est requise.";
    } else if (name === "date") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(value);
      if (!value.trim()) {
        return "Une date valide est requise.";
      } else if (selectedDate.getTime() < today.getTime()) {
        return "La date doit être aujourd'hui ou ultérieure.";
      }
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

    const newErrors: typeof errors = { ...errors };

    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value as string);
      newErrors[key as keyof typeof errors] = error;
    });

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) {
      setStatus("error");
      return;
    }

    setErrors({
      title: "",
      lastName: "",
      firstName: "",
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
        lastName: "",
        firstName: "",
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

      {errors.title && (
        <p className="error-message-service-title">{errors.title}</p>
      )}

      {/* Description */}
      <label>
        Description
        <input
          name="description"
          value={formData.description || "Description de la prestation"}
          onChange={handleChange}
          className="description-text"
          placeholder="Description de la prestation"
          readOnly
        />
      </label>

      {/* FullName */}
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

      {/* Email */}
      <label>
        Adresse e-mail
        <input
          name="email"
          type="email"
          value={formData.email}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Votre adresse e-mail"
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </label>

      {/* Phone */}
      <label>
        Numéro de téléphone
        <input
          name="phone"
          type="tel"
          value={formData.phone}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Votre numéro de téléphone"
        />
        {errors.phone && <p className="error-message">{errors.phone}</p>}
      </label>

      {/* Address */}
      <label>
        Adresse de prestation
        <input
          name="address"
          type="text"
          value={formData.address}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Adresse où la prestation doit être réalisée"
        />
        {errors.address && <p className="error-message">{errors.address}</p>}
      </label>

      {/* Date */}
      <label>
        Date
        <input
          name="date"
          type="date"
          value={formData.date}
          onBlur={handleBlur}
          onChange={handleChange}
          min={getTodayDate()}
        />
        {errors.date && <p className="error-message">{errors.date}</p>}
      </label>

      {/* Time */}
      <label>
        Heure
        <input
          name="time"
          type="time"
          value={formData.time}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {errors.time && <p className="error-message">{errors.time}</p>}
      </label>

      {/* Comments */}
      <label>
        Commentaires supplémentaires
        <textarea
          name="comments"
          value={formData.comments}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Indiquez vos besoins ou informations complémentaires"
        />
      </label>

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
          Erreur lors de l'envoi. Veuillez réessayer s'il vous plaît.
        </p>
      )}
    </form>
  );
};

export default BookingForm;
