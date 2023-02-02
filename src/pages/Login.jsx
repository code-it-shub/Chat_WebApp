import React from "react";
import "../pages/style.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      
    } catch (error) {
      toast.error("Something is Wrong!",{position:"top-center" ,theme: "dark",})
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapperLogin">
        <span className="logo">
          <h1> P ChatApp</h1>
        </span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="password" required />
          <button type="submit">Sign in</button>
        </form>
        <p>
          You don't have account ? <Link to="/register">Register</Link>
        </p>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;
