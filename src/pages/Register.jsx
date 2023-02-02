import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import React from "react";
import "../pages/style.scss";
import Add from "../image/avtar.png";
import { auth } from "../firebase";
import { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate,Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    //Authentication
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // cloud storage for image files
      const date = new Date().getTime();
      const storageRef = ref(storage, `images/${displayName + date}`);
      await uploadBytesResumable(storageRef,file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            toast.error("Something is Wrong!",{position:"top-center" ,theme: "dark",})
            setLoading(false);
          }
        });
      });
    } catch (error) {
      toast.error("Network issue",{position:"top-center" ,theme: "dark",})
      setLoading(false);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapperReg">
        <span className="logo">
          <h1>P ChatApp</h1>
        </span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" required />
          <input type="email" placeholder="Email" required/>
          <input type="password" placeholder="password" required />
          <input style={{ display: "none" }} type="file" id="files" required />
          <label htmlFor="files" style={{ display: "flex" }}>
            <img src={Add} alt="" style={{ width: "40px" }} />
            <span> Upload your Avatar</span>
          </label>
          <button disabled={loading}>Sign Up</button>
        </form>
        <p>You have already Registered?<Link to="/login">Login</Link></p>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Register;
