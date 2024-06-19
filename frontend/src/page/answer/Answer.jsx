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
  const answerDom = useRef();
  const { questionid } = useParams();
  const [question, setQuestion] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isTextAreaEmpty, setIsTextAreaEmpty] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch answers from the server
        const response = await axios.get(
          `https://evangadi-forum-backend-re4e.onrender.com/api/answers/getallanswer/${questionid}`
        );

        // Fetch question details
        const questionResponse = await axios.get(
          "https://evangadi-forum-backend-re4e.onrender.com/api/questions/getallquestions"
        );
        const singleQuestion = questionResponse.data.find(
          (question) => question.questionid === questionid
        );
        setQuestion(singleQuestion);

        // Fetch answers from localStorage
        const storedAnswers = JSON.parse(
          localStorage.getItem("answers") || "{}"
        );

        // Merge server and localStorage answers, giving priority to localStorage
        const combinedAnswers = [
          ...(storedAnswers[questionid] || []),
          ...response.data.filter(
            (answer) =>
              !(storedAnswers[questionid] || []).some(
                (storedAnswer) => storedAnswer.answer === answer.answer
              )
          ),
        ];

        setAnswers(combinedAnswers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [questionid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const answerValue = answerDom.current.value;

    if (!answerValue) {
      setIsTextAreaEmpty(true);
      return;
    }

    try {
      await axios.post(
        `https://evangadi-forum-backend-re4e.onrender.com/api/answers/postanswer/${questionid}`,
        {
          answer: answerValue,
          userid: user.userid,
        }
      );

      const newAnswerData = {
        answer: answerValue,
        username: user.username,
      };

      // Update answers in state and localStorage
      const updatedAnswers = [newAnswerData, ...answers];
      const storedAnswers = JSON.parse(localStorage.getItem("answers") || "{}");
      storedAnswers[questionid] = updatedAnswers;
      localStorage.setItem("answers", JSON.stringify(storedAnswers));

      setAnswers(updatedAnswers);
      setNewAnswer("");

      setSuccessMessage("Answer posted successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error posting answer:", error);
    }
  };

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
          {answers.map((answer, index) => (
            <div key={index}>
              <div key={index}>
                <div>
                  <div className={style.circle}>
                    <FaRegUserCircle className={style.icon} size={70} />
                  </div>
                </div>
              </div>
              <li className={style.userAnswer} key={index}>
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
          {successMessage && (
            <h3
              style={{
                color: "green",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {successMessage}
            </h3>
          )}
          <br />
          <Link
            style={{ color: "purple", fontSize: "20px", fontWeight: "bold" }}
            className={style.link}
            to="/"
          >
            Go to question page
          </Link>
        </div>
        <br />

        <div className={style.answer_form}>
          <form onSubmit={handleSubmit}>
            <textarea
              ref={answerDom}
              onChange={(e) => {
                setNewAnswer(e.target.value);
                setIsTextAreaEmpty(e.target.value === "");
              }}
              value={newAnswer}
              rows="7"
              placeholder="Your answer"
              style={{ borderColor: isTextAreaEmpty ? "red" : "" }}
            ></textarea>
            <br />
            <button className={style.btn} type="submit">
              Post your Answer
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// git checkuot -b hi
