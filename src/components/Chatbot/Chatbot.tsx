import React, { useState } from "react";
import { questionsData } from "../../data/questionsData";
import "./Chatbot.css";

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<
    Array<{ user: string; bot: string }>
  >([]);

  const handleSendMessage = (message: string) => {
    const foundAnswer = questionsData.find(
      (q) => q.question.toLowerCase() === message.toLowerCase()
    );

    // Add the bot's response (or a default message)
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        user: message,
        bot: foundAnswer
          ? foundAnswer.answer
          : "Désolé, je ne connais pas la réponse à cette question.",
      },
    ]);
  };

  const handleQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbox">
        {questionsData.length > 0 && (
          <div className="suggested-questions">
            <p>Voici quelques questions que vous pouvez me poser :</p>
            {questionsData.map((q, index) => (
              <button
                key={index}
                className="question-button"
                onClick={() => handleQuestionClick(q.question)}
              >
                {q.question}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg.user && (
              <div className="user-message">
                <strong>Utilisateur:</strong> {msg.user}
              </div>
            )}
            {msg.bot && (
              <div className="bot-message">
                <strong>Chatbot:</strong> {msg.bot}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatbot;
