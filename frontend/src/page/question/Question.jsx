import React, { useContext, useState, useRef } from "react";
import { RxDotFilled } from "react-icons/rx";
import style from "./Question.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios/axiosConfig";
import { AppState } from "../../App";
import Header from "../header/Header";
import Footer from "../footer/Footer";

export default function Question() {
  const navigate = useNavigate();
  const titleDom = useRef();
  const descriptionDom = useRef();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const { user } = useContext(AppState);

  async function handleSubmit(e) {
    e.preventDefault();

    const titleValue = titleDom.current.value;
    const descriptionValue = descriptionDom.current.value;

    if (!titleValue || !descriptionValue) {
      setIsButtonClicked(true);
      setErrorMessage("Please provide all required information.");
      return;
    }

    try {
      await axios.post("/questions/postquestion", {
        title: titleValue,
        description: descriptionValue,
        userid: user.userid,
      });

      setSuccessMessage("Question posted successfully, Redirecting to Home...");
      setErrorMessage("");
      setTimeout(() => {
        navigate("/");
      }, 2000); // Delay of 2 seconds before redirecting
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (isButtonClicked && e.target.value.trim()) {
      setIsButtonClicked(false);
      setErrorMessage("");
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (isButtonClicked && e.target.value.trim()) {
      setIsButtonClicked(false);
      setErrorMessage("");
    }
  };

  return (
    <div>
      <Header />
      <div className={style.Question}>
        <h1>Steps to write a good question</h1>
        <p>
          <RxDotFilled />
          Summarize your problem in a one-line title.
        </p>
        <p>
          <RxDotFilled /> Describe your problem in more detail.
        </p>
        <p>
          <RxDotFilled /> Describe what you tried and what you expected to
          happen.
        </p>
        <p>
          <RxDotFilled /> Review your question and post it to the site
        </p>
      </div>
      <br />
      <br />
      <div className={style.ask}>
        <div className={style.ask_public_question}>
          <h1>Ask a public question</h1>
          {successMessage && (
            <h3 style={{ color: "green" }} className={style.successMessage}>
              {successMessage}
            </h3>
          )}
          {errorMessage && (
            <h3 style={{ color: "red" }} className={style.errorMessage}>
              {errorMessage}
            </h3>
          )}
          <Link
            style={{ color: "purple", fontSize: "20px", fontWeight: "bold" }}
            className={style.link}
            to="/"
          >
            Go to question page
          </Link>
        </div>
        <br />
        <div className={style.ask_form}>
          <form onSubmit={handleSubmit}>
            <input
              ref={titleDom}
              type="text"
              placeholder="Title"
              value={title}
              onChange={handleTitleChange}
              className={
                isButtonClicked && !title.trim() ? style.highlight : ""
              }
            />
            <br />
            <br />
            <textarea
              ref={descriptionDom}
              id="w3review"
              name="w3review"
              rows="7"
              placeholder="Question Describe"
              value={description}
              onChange={handleDescriptionChange}
              className={
                isButtonClicked && !description.trim() ? style.highlight : ""
              }
            ></textarea>
            <br />
            <button className={style.btn}>Post your Question</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
