import React from "react";
import { IconType } from "react-icons";
import { useInView } from "react-intersection-observer";
import "./ServiceCard.css";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: IconType;
  imageUrl?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon: Icon,
  imageUrl,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <div ref={ref} className={`service-card ${inView ? "fade-in" : ""}`}>
      <div className="service-card-content">
        {imageUrl && (
          <div className="service-image">
            <img src={imageUrl} alt={title} />
          </div>
        )}
        <div className="service-wrapper">
          <div className="service-header">
            <div className="service-icon">
              <Icon />
            </div>
            <h3>{title}</h3>
          </div>
          <p>{description}</p>
          <button className="service-button">En savoir plus</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
