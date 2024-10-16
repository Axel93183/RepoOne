import React from "react";
import "./BenefitItem.css";

interface BenefitItemProps {
  icon: string;
  altText: string;
  title: string;
  description: string;
}

const BenefitItem: React.FC<BenefitItemProps> = ({
  icon,
  altText,
  title,
  description,
}) => {
  return (
    <div className="benefit-item">
      <img className="benefit-icon" src={icon} alt={altText} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default BenefitItem;
