import React from "react";

const InputDate = ({ field }) => {
  return (
    <div className="date-input-wrapper">
      <input
        type={field.type}
        name={field.label}
        className="register-form-field-date"
      />
    </div>
  );
};

export default InputDate;
