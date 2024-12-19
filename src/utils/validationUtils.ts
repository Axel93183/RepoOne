export const validateField = (name: string, value: string): string => {
  const regexes = {
    name: /^[a-zA-Z\s-]+$/,
    email: /\S+@\S+\.\S+/,
    phone: /^\+?[0-9]{7,15}$/,
    time: /^([01]\d|2[0-3]):?([0-5]\d)$/,
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date();
  maxDate.setFullYear(today.getFullYear() + 2); // Par exemple, 1 an à partir d'aujourd'hui.

  const selectedDate = value ? new Date(value) : null;

  return name === "title"
    ? value.trim()
      ? ""
      : "Veuillez sélectionner la prestation de votre choix."
    : name === "lastName" || name === "firstName"
    ? regexes.name.test(value)
      ? ""
      : "Seuls les lettres, espaces et tirets sont autorisés."
    : name === "email"
    ? regexes.email.test(value)
      ? ""
      : "Une adresse e-mail valide est requise."
    : name === "phone"
    ? regexes.phone.test(value)
      ? ""
      : "Un numéro de téléphone valide est requis."
    : name === "address"
    ? value.trim()
      ? ""
      : "L'adresse est requise."
    : name === "date"
    ? !value.trim()
      ? "Une date valide est requise."
      : selectedDate && selectedDate.getTime() < today.getTime()
      ? "La date doit être aujourd'hui ou ultérieure."
      : selectedDate && selectedDate.getTime() > maxDate.getTime()
      ? `La date ne peut pas dépasser le ${maxDate.toLocaleDateString(
          "fr-FR"
        )}.`
      : ""
    : name === "time"
    ? regexes.time.test(value)
      ? ""
      : "Une heure valide est requise."
    : name === "message"
    ? value.trim()
      ? ""
      : "Le message ne peut pas être vide."
    : "";
};

export const getTodayDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
