import React, { useEffect, useRef, useState } from "react";
import { questionsData } from "../../data/questionsData";
import "./Chatbot.css";

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<
    Array<{ user: string; bot: string }>
  >([]);
  const [showMessages, setShowMessages] = useState(false);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = (message: string) => {
    if (message.trim() === "") return;

    const newMessages = [
      { user: message, bot: "" },
      { user: "", bot: "loader" },
    ];

    setMessages((prevMessages) => [...prevMessages, ...newMessages]);

    setTimeout(() => {
      const foundAnswer = questionsData.find(
        (q) => q.question.toLowerCase() === message.toLowerCase()
      );
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        {
          user: "",
          bot: foundAnswer
            ? foundAnswer.answer
            : "Désolé, je ne connais pas la réponse à cette question.",
        },
      ]);
    }, 1200);
  };

  const handleQuestionClick = (question: string) => {
    setShowMessages(true);
    handleSendMessage(question);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      {!isChatBotOpen && (
        <div
          className={`chatbot-bubble ${isChatBotOpen ? "hidden" : "visible"}`}
          onClick={() => setIsChatBotOpen(true)}
        >
          💬
        </div>
      )}

      {isChatBotOpen && (
        <div className="chatbot-container visible">
          <div className="chatbot-header">
            <p>Foire Aux Questions - FAQ</p>
            <button
              className="close-button"
              onClick={() => setIsChatBotOpen(false)}
            >
              ✖
            </button>
          </div>
          <div className="chatbot">
            {questionsData.length > 0 && (
              <div className="suggested-questions">
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

          {showMessages && (
            <div className="messages-container">
              {messages.map((msg, index) => (
                <div key={index} className="message">
                  {msg.user && (
                    <div className="user-message">
                      <strong>Utilisateur:</strong> {msg.user}
                    </div>
                  )}
                  {msg.bot && (
                    <div
                      className={
                        msg.bot === "loader" ? "bot-loader" : "bot-message"
                      }
                    >
                      {msg.bot === "loader" ? (
                        <span>...</span>
                      ) : (
                        <>
                          <strong>Chatbot:</strong> <span>{msg.bot}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;
