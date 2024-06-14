
import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import style from "../../page/style.module.css";
import Header from "../header/Header";
import axios from "../../axios/axiosConfig";
import Footer from "../footer/Footer";

function Register() {
  const navigate = useNavigate();

  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  const [errors, setErrors] = useState({});

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? "" : `${name} is required`,
    }));
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const usernameValue = usernameDom.current.value;
    const firstnameValue = firstnameDom.current.value;
    const lastnameValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    let newErrors = {};
    if (!usernameValue) newErrors.username = "Username is required";
    if (!firstnameValue) newErrors.firstname = "First Name is required";
    if (!lastnameValue) newErrors.lastname = "Last Name is required";
    if (!emailValue) newErrors.email = "Email is required";
    if (!passwordValue) newErrors.password = "Password is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passwordValue,
      });
      alert("User registered successfully. Please login.");
      navigate("/login");
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.log(error.response);
    }
  }

  return (
    <section>
      <div>
        <Header />
      </div>
      <section className={style.all_container}>
        <div className={style.container}>
          <form className={style.register} onSubmit={handleSubmit} action="">
            <div className={style.user_register1}>
              <h2>Join the Network</h2>
              <br />
              <p>
                Already have an account?{" "}
                <Link className={style.link} to="/login">
                  Sign in
                </Link>
              </p>
              <br />
            </div>
            <div className={style.user_register}>
              <input
                ref={emailDom}
                type="text"
                name="email"
                placeholder="Email"
                style={{ backgroundColor: errors.email ? "#ffebee" : "white" }}
                onBlur={handleBlur}
                onFocus={handleFocus}
              />
              <br />
              <br />
              <div className={style.firstLastName}>
                <input
                  ref={firstnameDom}
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  style={{
                    backgroundColor: errors.firstname ? "#ffebee" : "white",
                  }}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                />
                <br />
                <br />
                <input
                  className={style.lastName}
                  ref={lastnameDom}
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  style={{
                    backgroundColor: errors.lastname ? "#ffebee" : "white",
                  }}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                />
              </div>
              <br />
              <div className={style.user}>
                <input
                  ref={usernameDom}
                  type="text"
                  name="username"
                  placeholder="Username"
                  style={{
                    backgroundColor: errors.username ? "#ffebee" : "white",
                  }}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                />
              </div>
              <br />
              <input
                ref={passwordDom}
                type="password"
                name="password"
                placeholder="Password"
                style={{
                  backgroundColor: errors.password ? "#ffebee" : "white",
                }}
                onBlur={handleBlur}
                onFocus={handleFocus}
              />
              <br />
              <br />
              <button type="submit">Agree and Join</button>
            </div>
            <br />
            <div className={style.user_register1}>
              <p>
                I agree to the{" "}
                <Link className={style.link}>Privacy Policy</Link> and{" "}
                <Link className={style.link}>Terms of Service</Link>.
              </p>
              <br />
              <Link className={style.link} to="/login">
                Already have an account?
              </Link>
            </div>
          </form>
          <div className={style.howitworks}>
            <Link className={style.link} to="/about">
              About
            </Link>
            <h1 style={{ fontSize: "45px", color: "#611B00" }}>
              Evangadi Networks
            </h1>
            <p>
              No matter what stage of life you are in, whether you’re just
              starting elementary school or being promoted to CEO of a Fortune
              500 company, you have much to offer to those who are trying to
              follow in your footsteps.
            </p>
            <br />
            <p>
              Whether you are willing to share your knowledge or you are just
              looking to meet mentors of your own, please start by joining the
              network here.
            </p>
            <br />
            <button className={style.button}>How it works</button>
          </div>
        </div>
      </section>
      <Footer />
    </section>
  );
}

export default Register;
