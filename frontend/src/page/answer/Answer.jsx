
import style from "./Answer.module.css";
import Header from "../header/Header";
import React, { useState, useEffect, useContext } from "react";
import { useRef } from "react";
import { Link, useParams } from "react-router-dom";

import axios from "../../axios/axiosConfig";
import { AppState } from "../../App";
import Footer from "../footer/Footer";
import { FaRegUserCircle } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";


export default function Answer() {
  const { user } = useContext(AppState);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  // const [getuser, setgetuser] = useState([]);
  const answerDom = useRef();
  const { questionid } = useParams();
  const [question, setQuestion] = useState({}); // Initialize as an object

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch answers with associated user information
        const response = await axios.get(
          `http://localhost:5500/api/answers/getallanswer/${questionid}` // Include questionid
        );
        setAnswers(response.data);

        // Fetch the specific question details
        const questionResponse = await axios.get(
          "http://localhost:5500/api/questions/getallquestions"
        );
        let singleQuestion = questionResponse.data.find(
          (question) => question.questionid === questionid
        )
         setQuestion(singleQuestion);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Fetch data when questionid changes

  async function handleSubmit(e) {
    e.preventDefault();

    const answerValue = answerDom.current.value;

    if (!answerValue) {
      alert("Please provide all required information");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5500/api/answers/postanswer/${questionid}`,
        {
          answer: answerValue,
          userid: user.userid,
        }
      );
      alert("Answer posted successfully!");

      // Refresh answers after posting

      // Clear the input field after posting answer
      setNewAnswer("");
    } catch (error) {
      console.error("Error posting answer:", error);
    }
  }
  console.log(question);

  return (
    <div>
      <Header />
      <div className={style.title}>
        <h1>Question</h1>
        <br />
        <h1 className={style.Question1}>
          <FaArrowRight size={12} /> {question.title}
        </h1>

        <h3 className={style.Question1} style={{ padding: "10px 0" }}>
          <FaArrowRight size={12} /> {question.description}
        </h3>
        <hr />
        <h2 className={style.answersFromCommunity}>
          Answers From the Community
        </h2>
        <hr />
        <ul>
          <br />
          {answers.map((answer, question, index) => (
            <div key={index}>
              <div key={question.questionId}>
                <div>
                  <div className={style.circle}>
                    <FaRegUserCircle className={style.icon} size={70} />
                  </div>

                  {/* <h3 style={{ marginLeft: "15px" }}>
                    
                    {getuser.find((user) => user.userid === question.userid)
                      ?.username || "Unknown"}
                  </h3> */}
                </div>
              </div>
              <li className={style.userAnswer} key={answer.answerid}>
                <h2>{answer.username}</h2>
                <div>
                  <h4>{answer.answer}</h4>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
      <div className={style.answer}>
        <div className={style.answer_public_question}>
          <h1>Answer the top question</h1>
          <br />
          <Link className={style.link} to="/">
            Go to question page
          </Link>
        </div>
        <br />

        <div className={style.answer_form}>
          <form onSubmit={handleSubmit}>
            <textarea
              ref={answerDom}
              onChange={(e) => setNewAnswer(e.target.value)}
              value={newAnswer}
              rows="7"
              placeholder="Your answer"
            ></textarea>
            <br />
            <button className={style.btn} type="submit">Post your Answer</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
// git checkuot -b hi