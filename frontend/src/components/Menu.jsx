import React, { useState } from "react";
import { useClickOutside } from "../hooks";
import { BsThreeDotsVertical } from "../assets/icons";

const Menu = ({ children }) => {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => {
    setOpen(false);
  });

  return (
    <div ref={ref} className="relative">
      <div
        className="py-2 px-1 rounded-sm border border-white cursor-pointer hover:bg-blue-900"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <BsThreeDotsVertical />
      </div>
      {open && (
        <ul className="shadow absolute rounded-sm top-10 z-10 right-0 w-50 h-auto py-2 *:cursor-pointer *:py-2 *:px-4 bg-blue-950  *:flex *:items-center *:gap-4 ">
          {children}
        </ul>
      )}
    </div>
  );
};

export default Menu;
