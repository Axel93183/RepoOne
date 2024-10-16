import React from "react";
import "./TestimonialItem.css";

interface TestimonialProps {
  quote: string;
  author: string;
}

const TestimonialItem: React.FC<TestimonialProps> = ({ quote, author }) => {
  return (
    <div className="testimonial-item">
      <p>{quote}</p>
      <h4>- {author}</h4>
    </div>
  );
};

export default TestimonialItem;
