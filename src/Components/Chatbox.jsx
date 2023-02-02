import React from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { ChatContext } from "../Context/chatContext";
import '../pages/style.scss'
const Chatbox = () => {
  const [chats, setChats] = useState([]);
  const { currUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };
    currUser.uid && getChats();
  }, [currUser.uid]);
  const handleSelect = (u) => {
    var x = window.matchMedia("(max-width: 480px)")
    if (x.matches) { // If media query matches
      document.getElementById("slidebar").style.display="none"
    } else {
      document.getElementById("slidebar").style.display="block"
    }
    document.getElementById("chhats").style.display="block"
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  return (
    <div className="chatbox">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="userchat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
            
          >
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className="userinfo">
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chatbox;
