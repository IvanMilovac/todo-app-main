import React, { useState, useContext } from "react";

import Checkbox from "./Checkbox";

import { themeContext } from "../App";

import "../styles/components/Banner.scss";

import IconSun from "../images/icon-sun.svg";
import IconMoon from "../images/icon-moon.svg";

const Banner = ({ todos, setTodos }) => {
  const { theme, setTheme } = useContext(themeContext);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [todoText, setTodoText] = useState("");
  const changeThemeHandler = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    theme === "light"
      ? localStorage.setItem("theme", "dark")
      : localStorage.setItem("theme", "light");
  };
  const newTodoHandler = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        text: todoText,
        completed: checkboxValue,
      },
    ]);
    localStorage.setItem(
      "todos",
      JSON.stringify([
        ...todos,
        {
          id: todos.length + 1,
          text: todoText,
          completed: checkboxValue,
        },
      ])
    );
    setTodoText("");
    setCheckboxValue(false);
  };

  return (
    <div
      className={`banner ${
        theme === "light" ? "banner-light-bg-image" : "banner-dark-bg-image"
      }`}
    >
      <div className="banner-content">
        <div className="banner-header">
          <h2>Todo</h2>
          <img
            src={theme === "dark" ? IconSun : IconMoon}
            onClick={changeThemeHandler}
            alt=""
          />
        </div>
        <form onSubmit={newTodoHandler} className="input-todo">
          <Checkbox
            theme={theme}
            value={checkboxValue}
            onClick={setCheckboxValue}
            label="cb-input"
          />
          <input
            className={theme === "light" ? "light-input" : "dark-input"}
            type="text"
            placeholder="Create a new todo..."
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default Banner;
