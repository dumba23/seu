import React from "react";
import FileImg from "../../assets/images/register-file.png";
import "./InputFile.css";

const InputFile = ({ label }) => {
  return (
    <div className="file-input-container">
      <input type="file" id="file-input" className="file-input" name={label} />
      <label htmlFor="file-input" className="file-input-label">
        <div className="file-input-content">
          <div className="file-input-icon">
            <img src={FileImg} alt="Upload Icon" />
          </div>
          <div className="file-input-text">
            <span>{label}</span>
            <br />
            <span>ან</span>
            <br />
            <span className="file-input-link">ატვირთე კომპიუტერიდან</span>
          </div>
        </div>
      </label>
    </div>
  );
};

export default InputFile;
