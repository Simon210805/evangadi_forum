import React, { useState, useContext, useEffect } from "react";
import { AppState } from "../../App";
import style from "./Home.module.css";
import Header from "../header/Header";
import { Link } from "react-router-dom";
import axios from "../../axios/axiosConfig";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import Footer from "../footer/Footer";

function Home() {
  const { user } = useContext(AppState);
  const [userdata, setuserdata] = useState([]);
  const [getuser, setgetuser] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await axios.get(
          "https://evangadi-forum-backend-re4e.onrender.com/api/users/getuser"
        );
        const userData = userResponse.data;

        // Fetch question data
        const questionResponse = await axios.get(
          "https://evangadi-forum-backend-re4e.onrender.com/api/questions/getallquestions"
        );
        const questionData = questionResponse.data.reverse(); // Reverse once here

        // Update state with users and questions
        setgetuser(userData);
        setuserdata(questionData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter questions based on search input
  const filteredQuestions = userdata.filter((question) =>
    question.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Header />
      <hr />
      <br />
      <div className={style.container}>
        <div className={style.header}>
          <Link className={style.link1} to="/question/">
            Ask Question
          </Link>
          <div className={style.welcome}>
            <h2>Welcome, {user.username}!</h2>
          </div>
        </div>

        <br />
        <br />
        <div className={style.question_header}>
          <h1>Questions</h1>
          <div className={style.search}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className=""
            />
            <FaSearch className={style["search-icon"]} />
          </div>
        </div>
        <br />
        <div className={style.quesion}>
          {filteredQuestions.map((question, index) => (
            <div key={question.questionId} className={style.quesion_container}>
              <div className={style.userQuesion}>
                <div>
                  <FaRegUserCircle className={style.icon} size={70} />
                  <h3 style={{ marginLeft: "15px" }}>
                    {getuser.find((user) => user.userid === question.userid)
                      ?.username || "Unknown"}
                  </h3>
                </div>
                <div className={style.title}>
                  <h3>{question.title}</h3>
                </div>
              </div>
              <div className={style.arrow_icon}>
                <Link to={`/answer/${question.questionid}`}>
                  <h2>
                    <IoIosArrowForward size={30} />
                  </h2>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default Home;
