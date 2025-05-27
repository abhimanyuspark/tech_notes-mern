import { useEffect, useRef } from "react";

const usePosition = ({ toggle, top = 0 }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (toggle && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      // if (rect.right > window.innerWidth) {
      //   dropdownRef.current.style.right = `0`;
      // } else {
      //   dropdownRef.current.style.left = "0";
      // }
      if (rect.bottom > window.innerHeight) {
        dropdownRef.current.style.bottom = `${top}px`;
      } else {
        dropdownRef.current.style.top = `${top}px`;
      }
    }

    return () => {
      if (dropdownRef.current) {
        dropdownRef.current.style.right = "";
        dropdownRef.current.style.left = "";
        dropdownRef.current.style.bottom = "";
        dropdownRef.current.style.top = "";
      }
    };
  }, [toggle, top]);

  return dropdownRef;
};

export default usePosition;
