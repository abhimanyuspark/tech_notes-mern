import React from "react";

const UnAuthorized = ({ message }) => {
  return (
    <div className="flex items-center justify-center gap-4 h-screen">
      <div>UnAuthorized</div>
      <div>{message}</div>
    </div>
  );
};

export default UnAuthorized;
