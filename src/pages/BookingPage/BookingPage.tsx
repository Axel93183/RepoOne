import React from "react";
import { useLocation } from "react-router-dom";
import BookingForm from "../../components/BookingForm/BookingForm";
import "./BookingPage.css";

const BookingPage: React.FC = () => {
  const location = useLocation();
  const prefilledData = location.state?.prefilledData || null;

  return (
    <div className="booking-page">
      <h1>Réserver une prestation</h1>
      <p>Sélectionnez une prestation et réservez une date.</p>
      <BookingForm prefilledData={prefilledData} />
    </div>
  );
};

export default BookingPage;
