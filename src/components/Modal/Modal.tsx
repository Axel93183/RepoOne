import React, { useEffect, useState } from "react";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return visible ? (
    <div className={`modal-overlay ${isOpen ? "fade-in" : "fade-out"}`}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✖
        </button>
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
