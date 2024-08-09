import React, { useState } from "react";

const InputCheckbox = ({ option, field }) => {
  const [checked, setChecked] = useState(false);

  const handleDivClick = () => {
    setChecked((prevChecked) => !prevChecked);
  };

  return (
    <div
      className="register-checkbox-option"
      onClick={handleDivClick}
      style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
    >
      <input
        type="checkbox"
        value={option}
        name={field.label}
        checked={checked}
        onChange={() => setChecked((prevChecked) => !prevChecked)}
      />
      <label style={{ marginLeft: "0.2rem" }}>{option}</label>
    </div>
  );
};

export default InputCheckbox;
