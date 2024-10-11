import React, { useState } from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = () => {
  const [currentTemperAtureUnit, handleToggleSwitchChange] = useState("C");

  const handleChange = (e) => {
    if (currentTemperAtureUnit === "C") handleToggleSwitchChange("F");
    if (currentTemperAtureUnit === "F") handleToggleSwitchChange("C");
  };

  return (
    <label className="switch">
      <input type="checkbox" className="switch__box" onChange={handleChange} />
      <span
        className={
          currentTemperAtureUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      ></span>
      <p
        className={`switch__temp-F ${
          currentTemperAtureUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${
          currentTemperAtureUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
