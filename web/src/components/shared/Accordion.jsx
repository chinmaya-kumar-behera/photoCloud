import React, { useState } from "react";

const Accordion = ({ title, children }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleAccordion = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="w-full border-b border-gray-400 py-2">
      <div
        className={`cursor-pointer ${isActive ? "rounded-t-lg" : "rounded-lg"}`}
        onClick={toggleAccordion}
      >
        <span>{title}</span>
      </div>
       <div
        className={`overflow-hidden transition-all duration-700 ${
          isActive ? "max-h-[1000px]" : "max-h-0 p-0"
        }`}
      >
        <div className="rounded-b-lg">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
