import React from "react";

const PageContainer = ({ children, className }) => {
  const style = `lg:max-w-6xl xl:max-w-7xl mx-auto ${className}`;
  return <div className={style}>{children}</div>;
};

export default PageContainer;
