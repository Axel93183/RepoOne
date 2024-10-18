import "./Chatbot.css";

import React, { useState } from "react";

const Chatbot: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<
    Array<{ user: string; bot: string }>
  >([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = input;
    setMessages([...messages, { user: userMessage, bot: "..." }]);
    setInput("");

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userMessage }),
      });

      const data = await response.json();
      setMessages((prevMessages) =>
        prevMessages.map((msg, i) =>
          i === prevMessages.length - 1 ? { ...msg, bot: data.answer } : msg
        )
      );
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setMessages((prevMessages) =>
        prevMessages.map((msg, i) =>
          i === prevMessages.length - 1
            ? { ...msg, bot: "Erreur dans la réponse du chatbot." }
            : msg
        )
      );
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbox">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <div>
              <strong>Vous:</strong> {msg.user}
            </div>
            <div>
              <strong>Assistance:</strong> {msg.bot}
            </div>
          </div>
        ))}
      </div>
      <div className="chatbot-input-container">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Posez votre question..."
        />
        <button className="chatbot-send-button" onClick={handleSendMessage}>
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
