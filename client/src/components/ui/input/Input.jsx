import React from "react";
import "./input.css";

const Input = ({ value, setValue, type, placeholder }) => {
  const handleChange = (e) => {
    const val = type === 'number' 
      ? parseInt(e.target.value) || 0 // Преобразуем в число
      : e.target.value;
    setValue(val);
  };

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
