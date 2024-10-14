import React, { useState } from "react";
import DropdownFilter from "../../components/DropdownFilter/DropdownFilter"; // Import DropdownFilter
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import { servicesData } from "../../data/servicesData"; // Import servicesData
import "./ServicesPage.css";

const ServicesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  // Get a list of categories from servicesData
  const categories = servicesData.map((cat) => cat.category);

  // Filter services by selected category
  const filteredServices = selectedCategory
    ? servicesData.filter((cat) => cat.category === selectedCategory)
    : servicesData;

  return (
    <div className="services-page">
      <h1>Nos Services</h1>

      <DropdownFilter
        options={categories}
        selectedOption={selectedCategory}
        handleChange={handleCategoryChange}
        label="Trier par catégorie :"
      />

      <div className="services-list">
        {filteredServices.map((category) => (
          <div key={category.id} className="category-service">
            <h2>{category.category}</h2>{" "}
            <div className="category-section">
              {category.services.map((service) => (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  icon={category.icon}
                  imageUrl={service.imageUrl}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
