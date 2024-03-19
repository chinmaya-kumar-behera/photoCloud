// import React from "react";

// const LoaderSpinner = () => {
//   return (
//     <div className="loader-spinner">
//       <div className="loader"></div>
//     </div>
//   );
// };

// export default LoaderSpinner;


import React from "react";

const LoaderSpinner = ({ size='sm' }) => {
  let spinnerSizeClass = "";

  switch (size) {
    case "sm":
      spinnerSizeClass = "w-5 h-5 border-2"; // Small size
      break;
    case "lg":
      spinnerSizeClass = "w-10 h-10 border-4"; // Large size
      break;
    case "xl":
      spinnerSizeClass = "w-16 h-16 border-6"; // Extra-large size
      break;
    default:
      spinnerSizeClass = "w-8 h-8 border-3"; // Default size (medium)
      break;
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div
        className={`loader ${spinnerSizeClass} border-gray-200 border-t-[#21272b] rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default LoaderSpinner;
