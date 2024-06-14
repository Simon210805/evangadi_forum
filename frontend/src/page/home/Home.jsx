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
          "http://localhost:5500/api/users/getuser"
        );
        const userData = userResponse.data;

        // Fetch question data
        const questionResponse = await axios.get(
          "http://localhost:5500/api/questions/getallquestions"
        );
        const questionData = questionResponse.data;

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
console.log(userdata)
  return (
    <div>
      <div>
        <Header />
      </div>
      <hr />
      <br />
      <div className={style.container}>
        <div className={style.header}>
          <Link className={style.link1} to="/question/">
            Ask Question
          </Link>
          <div className={style.welcome}>
            <h2> welcome, {user.username}!</h2>
            {/* <h2> welcome </h2> */}
          </div>
        </div>

        <br />
        <br />
        <div className={style.question_header}>
          <h1>Questions</h1>
          <div className={style.search}>
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
        </div>
        <br />
        <div className={style.quesion}>
          {filteredQuestions.map((question, index) => (
            <div key={index}>
            <div key={question.questionId}>
              <div className={style.quesion_container}>
                <div className={style.userQuesion}>
                  <div>
                    <div>
                      <FaRegUserCircle className={style.icon} size={70} />
                    </div>
                    
                    <h3 style={{ marginLeft: "15px" }}>
                      {/* Asked by:{" "} */}
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
