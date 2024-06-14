import React, { useEffect, useState, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import style from "./App.module.css";
{
  /* The following line can be included in your src/index.js or App.js file*/
}

import Home from "./page/home/Home";
import Register from "./page/register/Register";
//import Login from "./page/login/Login";
import Login from  './page/login/Login.jsx' 
import Question from "./page/question/Question.jsx";

import axios from "./axios/axiosConfig.js";
import Answer from "./page/answer/Answer.jsx";

export const AppState = createContext();

function App() {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data);
    } catch (error) {
      console.log(error.response);
      navigate("/login");
    }
  }
  useEffect(() => {
    checkUser();
  }, [token]);
  return (
    <div className={style.App}>
      <AppState.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/question" element={<Question />} />
          <Route path="/answer/:questionid" element={<Answer />} />
          {/* <Route path="/answer/:answerId" component={SpecificAnswerComponent} /> */}
          {/* <Route path="/answer/:questionId" component={<Answer />} />  */}
        </Routes>
      </AppState.Provider>
    </div>
  );
}

export default App;
