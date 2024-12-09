import React, { useState } from "react";
import { IconType } from "react-icons";
import { useInView } from "react-intersection-observer";
import Modal from "../Modal/Modal";
import "./ServiceCard.css";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: IconType;
  imageUrl?: string;
  offer: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon: Icon,
  imageUrl,
  offer,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
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
            <button className="service-button" onClick={openModal}>
              En savoir plus
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h3>{title}</h3>
        <p>{description}</p>
        {imageUrl && <img src={imageUrl} alt={title} />}
        <div className="modal-offer">
          <p>{offer}</p>
        </div>
      </Modal>
    </>
  );
};

export default ServiceCard;
