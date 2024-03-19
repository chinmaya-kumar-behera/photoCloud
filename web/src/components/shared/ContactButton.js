import React from 'react'

const ContactButton = ({ size, className }) => {
  return (
      <button className={`${className} px-10 py-4 rounded-full bg-blue-500 border border-blue-500 hover:bg-transparent text-white hover:text-black hover:underline transition-all duration-300`}>
      Lets Talk
    </button>
  );
};

export default ContactButton