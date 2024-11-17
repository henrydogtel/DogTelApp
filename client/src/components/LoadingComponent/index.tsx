// LoadingModal.jsx
import React from "react";

export default function LoadingModal() {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg flex flex-col items-center shadow-lg">
        {/* Giphy Embed */}
        <iframe
          src="https://giphy.com/embed/XRt0oP8fn9pUgUO0bw"
          width="200"
          height="150"
          frameBorder="0"
          className="mb-4 rounded-lg"
          allowFullScreen
          title="Running dog"
        ></iframe>
        <p className="text-xl text-[#FA7070] font-semibold animate-bounce">
          Loading... preparing everything for your pet 🐾
        </p>
      </div>
    </div>
  );
}
