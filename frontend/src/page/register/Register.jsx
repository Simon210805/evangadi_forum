import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import style from "../../page/style.module.css";
import Header from "../header/Header";
import axios from "../../axios/axiosConfig";
import Footer from "../footer/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  const [errors, setErrors] = useState({});
  const [registrationError, setRegistrationError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

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
    setRegistrationError("");

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
      setRegistrationSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMsg = error.response.data.msg;
        if (errorMsg === "User already registered") {
          setRegistrationError("User already registered");
        } else if (errorMsg === "Password must be greater than 8 characters") {
          setRegistrationError("Password must be greater than 8 characters");
        } else {
          setRegistrationError("Something went wrong. Please try again.");
        }
      } else {
        setRegistrationError("Something went wrong. Please try again.");
      }
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

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
              {registrationError && (
                <h3
                  style={{
                    color: "red",
                    textAlign: "center",
                    marginBottom: "10px",
                  }}
                >
                  {registrationError}
                </h3>
              )}
              {registrationSuccess && (
                <h3
                  style={{
                    color: "rgb(72, 215, 72)",
                    textAlign: "center",
                    marginBottom: "10px",
                  }}
                >
                  User registered successfully. Please login.
                </h3>
              )}
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
              <div className={style.password_container}>
                <input
                  ref={passwordDom}
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  style={{
                    backgroundColor: errors.password ? "#ffebee" : "white",
                  }}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                />
                <span
                  className={style.password_toggle_icon}
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
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
