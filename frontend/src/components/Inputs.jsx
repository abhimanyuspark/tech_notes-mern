import React, { useEffect, useRef } from "react";
import { FaEye, FaEyeSlash, FaRandom } from "../assets/icons";

const Label = ({ name, label, important }) => {
  return (
    <label
      htmlFor={name}
      className="text-sm/6 font-medium text-gray-100 cursor-pointer flex gap-2"
    >
      {label}
      {important && <sup className="text-red-500 text-base static">*</sup>}
    </label>
  );
};

const Input = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  random = false,
  autoComplete = "off",
  label,
  error,
  show,
  setShow,
  onRandom,
  important,
}) => {
  return (
    <div className="relative flex gap-2 flex-col">
      {label && <Label label={label} name={name} important={important} />}

      {random && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            onRandom();
          }}
          aria-hidden="true"
          className="absolute text-xl top-[40px] right-10 cursor-pointer"
        >
          <FaRandom />
        </div>
      )}

      {name === "password" && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setShow();
          }}
          aria-hidden="true"
          className="absolute text-xl top-[40px] right-2 cursor-pointer"
        >
          {show ? <FaEye /> : <FaEyeSlash />}
        </div>
      )}

      <input
        id={name}
        name={name}
        autoComplete={autoComplete}
        type={type}
        value={value}
        placeholder={placeholder}
        className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 placeholder:text-white focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 ${
          error
            ? "outline-red-500 focus:outline-red-600"
            : "outline-gray-300 focus:outline-indigo-600"
        }`}
        onChange={onChange}
      />

      <p className="text-red-500 text-sm">{error}</p>
    </div>
  );
};

const CheckBox = ({
  label,
  indeterminate,
  disabled,
  onChange,
  checked,
  important,
  name,
  className = "",
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <div className={className + " flex gap-2 items-center"}>
      <input
        type="checkbox"
        id={name}
        ref={ref}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={"w-4 h-4 aspect-square bg-white accent-white"}
      />
      {label && <Label label={label} name={name} important={important} />}
    </div>
  );
};

const InputSelect = ({
  value,
  onChange,
  children,
  label,
  name,
  error,
  multiple = false,
  size,
  important,
}) => {
  return (
    <div className="flex gap-2 flex-col min-w-auto max-w-full">
      {label && <Label important={important} label={label} name={name} />}
      <select
        id={name}
        multiple={multiple}
        size={size}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-slate-300 p-2 rounded-[0.2rem]"
      >
        {children}
      </select>

      <p className="text-red-500 text-sm">{error}</p>
    </div>
  );
};

const TextArea = ({ name, value, onChange, label, error, important }) => {
  return (
    <div className="flex gap-2 flex-col">
      {label && <Label label={label} name={name} important={important} />}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 placeholder:text-white focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 h-20 ${
          error
            ? "outline-red-500 focus:outline-red-600"
            : "outline-gray-300 focus:outline-indigo-600"
        }`}
      ></textarea>
      <p className="text-red-500 text-sm">{error}</p>
    </div>
  );
};

export { CheckBox, InputSelect, Input, TextArea };
