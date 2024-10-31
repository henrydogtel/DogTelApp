import React from "react";

const HelpComponent = () => {
  return (
    <div className="bg-[#FAF7F0] border border-[#B17457] p-6 rounded-lg shadow-md max-w-sm mx-auto">
      <h2 className="text-[#B17457] text-2xl mb-2">Need Help?</h2>
      <p className="text-gray-800 mb-4">
        We are here to assist you. You can contact us through the following
        means:
      </p>
      <div className="text-[#FA7070]">
        <p>
          Email:{" "}
          <a
            href="mailto:support@dogtel.com"
            className="text-[#B17457] hover:underline"
          >
            support@dogtel.com
          </a>
        </p>
        <p>
          Phone:{" "}
          <a href="tel:+123456789" className="text-[#B17457] hover:underline">
            +1 234 567 89
          </a>
        </p>
        <p>Hours: Monday to Friday, 9 AM - 5 PM</p>
      </div>
    </div>
  );
};

export default HelpComponent;
