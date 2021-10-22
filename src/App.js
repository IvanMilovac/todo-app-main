import React, { useState, createContext } from "react";

import Banner from "./components/Banner";
import BodySection from "./components/BodySection";
import "./styles/reset.scss";

export const themeContext = createContext();

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      <Banner setTodos={setTodos} todos={todos} />
      <BodySection setTodos={setTodos} todos={todos} />
    </themeContext.Provider>
  );
};

export default App;
