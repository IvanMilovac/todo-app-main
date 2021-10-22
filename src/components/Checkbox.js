import React from "react";

import "../styles/components/Checkbox.scss";

const Checkbox = ({ theme, value, onClick, label }) => {
  return (
    <>
      <input
        type="checkbox"
        onChange={(e) => onClick(e.target.checked)}
        id={label}
        className="todo-checkbox"
        defaultChecked={value}
      />
      <label
        className={theme === "light" ? "light-input" : "dark-input"}
        htmlFor={label}
      ></label>
    </>
  );
};

export default Checkbox;
