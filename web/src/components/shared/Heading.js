import React from 'react'

const Heading = ({children}) => {
  return (
    <div className="w-full font-bold text-3xl lg:text-5xl">
      {children}
    </div>
  );
}

export default Heading