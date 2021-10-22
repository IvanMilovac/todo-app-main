import React, { useState, useContext, useEffect } from "react";

import { themeContext } from "../App.js";

import Checkbox from "./Checkbox";

import "../styles/components/BodySection.scss";

const BodySection = ({ todos, setTodos }) => {
  const { theme } = useContext(themeContext);
  const [previousTodosState, setPreviousTodosState] = useState([...todos]);
  const [activeButton, setActiveButton] = useState("all");

  useEffect(() => {
    setPreviousTodosState([...todos]);
  }, [todos]);

  const clearHandler = () => {
    setTodos(todos.filter((todo) => todo.completed === false));
  };

  const completedTodosHandler = () => {
    setPreviousTodosState(todos.filter((todo) => todo.completed === true));
    setActiveButton("completed");
  };

  const activeTodosHandler = () => {
    setPreviousTodosState(todos.filter((todo) => todo.completed === false));
    setActiveButton("active");
  };

  const allTodosHandler = () => {
    setPreviousTodosState([...todos]);
    setActiveButton("all");
  };

  return (
    <div
      className={`body-section ${
        theme === "light" ? "light-body-bg" : "dark-body-bg"
      }`}
    >
      <div
        className={`body-section-container ${
          todos.length === 0 && "no-items-display-none"
        }`}
      >
        <ul>
          {previousTodosState.map((todo, index) => (
            <li
              className={`${theme === "light" ? "light-input" : "dark-input"}`}
              key={todo.text}
            >
              <Checkbox
                theme={theme}
                value={todo.completed}
                className="checkbox-list-item"
                onClick={(e) => {
                  setTodos(
                    todos.map((td) => {
                      if (todo.id === td.id) {
                        return { ...td, completed: e };
                      }
                      return td;
                    })
                  );
                  localStorage.setItem(
                    "todos",
                    JSON.stringify(
                      todos.map((td) => {
                        if (todo.id === td.id) {
                          return { ...td, completed: e };
                        }
                        return td;
                      })
                    )
                  );
                }}
                label={todo.text}
              />
              <span className={`todo-text ${todo.completed && "line-through"}`}>
                {todo.text}
              </span>
              <span
                onClick={() => {
                  setTodos(todos.filter((td) => td.id !== todo.id));
                  localStorage.setItem(
                    "todos",
                    JSON.stringify(todos.filter((td) => td.id !== todo.id))
                  );
                }}
                className="todo-delete"
              >
                &times;
              </span>
            </li>
          ))}
        </ul>
        <div
          className={`items-left-clear-completed ${
            theme === "light" ? "light" : "dark"
          }`}
        >
          <span>
            {todos.filter((todo) => todo.completed === false).length} items left
          </span>
          <button
            onClick={clearHandler}
            disabled={
              todos.filter((todo) => todo.completed === true).length === 0
            }
          >
            Clear Completed
          </button>
        </div>
        <div
          className={`filter-buttons ${
            theme === "light" ? "light-theme" : "dark-theme"
          }`}
        >
          <button
            onClick={allTodosHandler}
            className={activeButton === "all" ? "active" : ""}
          >
            All
          </button>
          <button
            onClick={activeTodosHandler}
            className={activeButton === "active" ? "active" : ""}
          >
            Active
          </button>
          <button
            onClick={completedTodosHandler}
            className={activeButton === "completed" ? "active" : ""}
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default BodySection;
