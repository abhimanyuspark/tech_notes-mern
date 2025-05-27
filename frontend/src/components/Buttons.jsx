import React from "react";

const Button = ({ text, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="py-2 px-4 w-auto rounded-md text-black font-semibold bg-white cursor-pointer"
    >
      {text}
    </button>
  );
};

const CancelButton = ({ text, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="py-2 px-4 w-auto rounded-md text-white font-semibold hover:text-black hover:bg-white cursor-pointer"
    >
      {text}
    </button>
  );
};

export { Button, CancelButton };
