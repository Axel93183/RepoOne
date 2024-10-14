// src/components/ServiceCard/ServiceCard.tsx
import React from "react";
import { IconType } from "react-icons";
import { useInView } from "react-intersection-observer"; // Import Intersection Observer hook
import "./ServiceCard.css";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: IconType;
  imageUrl?: string; // Optional image URL
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon: Icon,
  imageUrl,
}) => {
  // Use the intersection observer hook
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger the animation only once
    threshold: 0.1, // Animation triggers when 10% of the card is in view
  });
  return (
    <div ref={ref} className={`service-card ${inView ? "fade-in" : ""}`}>
      <div className="service-card-content">
        {imageUrl && (
          <div className="service-image">
            <img src={imageUrl} alt={title} />
          </div>
        )}
        <div className="service-header">
          <div className="service-icon">
            <Icon />
          </div>
          <h2>{title}</h2>
        </div>
        <p>{description}</p>
        <button className="service-button">En savoir plus</button>
      </div>
    </div>
  );
};

export default ServiceCard;
