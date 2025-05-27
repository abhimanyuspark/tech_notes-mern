import React from "react";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
