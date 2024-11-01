"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

type Message = {
  text: string;
  type: "user" | "bot";
  inProgress?: boolean;
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isBotOnline] = useState(true);

  const predefinedResponses: { [key: string]: string } = {
    "How does Dogtel work?":
      "Dogtel connects pet owners with trusted caregivers.",
    "What services do you offer?":
      "We offer pet care, walking, and boarding services.",
    "How can I book a service?": "You can book a service through our website.",
    "What are the service prices?":
      "Prices vary depending on the service and duration. Visit our pricing section for more details.",
    "Who are the caregivers?":
      "Our caregivers are verified individuals with experience in pet care.",
    "What if my pet needs veterinary care?":
      "In case of an emergency, the caregiver will contact you and a local veterinarian.",
    "How can I cancel a booking?":
      "You can cancel your booking from your profile or by contacting us directly.",
    "Do you offer care for exotic pets?":
      "Currently, Dogtel specializes in dogs. Check with the caregiver if you have other types of pets.",
  };

  const generateAIResponse = (question: string) => {
    if (question.includes("help") || question.includes("assistance")) {
      return "I’m here to help! Feel free to ask about our services, pricing, or caregivers.";
    } else if (question.includes("book")) {
      return "You can book our services online through our website’s booking section.";
    } else if (question.includes("safety")) {
      return "All of our caregivers are vetted thoroughly to ensure the safety of your pet.";
    } else {
      return "I'm here to assist! Could you specify your question a bit more?";
    }
  };

  const handleQuestionClick = (question: string) => {
    const userMessage: Message = { text: question, type: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setSelectedQuestion(question);

    const botResponseText =
      predefinedResponses[question] || generateAIResponse(question);
    const botMessage: Message = { text: "...", type: "bot", inProgress: true };
    setMessages((prevMessages) => [...prevMessages, botMessage]);

    setTimeout(() => {
      let currentText = "";
      const typingSpeed = 50;
      const typingInterval = setInterval(() => {
        currentText = botResponseText.slice(0, currentText.length + 1);
        setMessages((prevMessages) =>
          prevMessages.map((msg, idx) =>
            idx === prevMessages.length - 1
              ? { ...msg, text: currentText }
              : msg
          )
        );

        if (currentText === botResponseText) {
          clearInterval(typingInterval);
          setMessages((prevMessages) =>
            prevMessages.map((msg, idx) =>
              idx === prevMessages.length - 1
                ? { ...msg, inProgress: false, text: botResponseText }
                : msg
            )
          );
        }
      }, typingSpeed);
    }, 1000);
  };

  const resetQuestions = () => {
    setSelectedQuestion(null);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatbotRef.current &&
        !chatbotRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="fixed bottom-4 right-4">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white shadow-xl rounded-full p-2 hover:bg-gray-100 hover:scale-105 transition-all duration-300"
        >
          <Image
            src="/Dogbot1.jpg"
            alt="icono"
            className="rounded-full border-2 border-gray-300 transition-transform duration-300"
            width={60}
            height={60}
          />
        </button>
      )}

      {isOpen && (
        <div
          ref={chatbotRef}
          className="bg-white shadow-2xl rounded-lg w-80 p-5 border border-gray-300 mt-2 relative animate-fade-in"
        >
          <h2 className="text-lg font-bold text-gray-700 mb-3 flex items-center">
            <Image
              src="/Dogbot.jpg"
              alt="DogBot"
              className="w-8 h-8 rounded-full mr-2"
              width={100}
              height={100}
            />
            DogBot
            <span
              className={`ml-2 w-2 h-2 rounded-full ${
                isBotOnline ? "bg-green-500" : "bg-red-500"
              }`}
            />
          </h2>
          <div className="max-h-60 overflow-y-auto mb-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`my-2 p-2 rounded-lg text-sm max-w-xs ${
                  msg.type === "user"
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-200 text-gray-800 self-start"
                }`}
                style={{
                  borderRadius:
                    msg.type === "user"
                      ? "15px 15px 0 15px"
                      : "15px 15px 15px 0",
                  alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
                }}
              >
                {msg.text}
                {msg.inProgress && <span className="animate-blink">|</span>}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="grid grid-cols-1 gap-2">
            {selectedQuestion ? (
              <button
                onClick={resetQuestions}
                className="bg-gradient-to-r from-blue-400 to-blue-500 text-white py-1 px-2 rounded-lg text-xs hover:from-blue-500 hover:to-blue-600 transition transform hover:scale-105"
              >
                Ask another question
              </button>
            ) : (
              Object.keys(predefinedResponses).map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(question)}
                  className="bg-gradient-to-r from-blue-400 to-blue-500 text-white py-1 px-2 rounded-lg text-xs hover:from-blue-500 hover:to-blue-600 transition transform hover:scale-105"
                >
                  {question}
                </button>
              ))
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg font-semibold"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
