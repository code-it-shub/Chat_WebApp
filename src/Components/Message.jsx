
import React from "react";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/chatContext";

const Message = ({ message }) => {
  const { data } = useContext(ChatContext);
  const { currUser } = useContext(AuthContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currUser.uid && "owner"}`}
    >
      <div className="messagestatus">
        <img
          src={
            message.senderId === currUser.uid
              ? currUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span></span>
      </div>
      <div className="messagecontent">
        {message.text && <p>{message.text}</p>}
        {message.image && <a href={message.image}><img src={message.image} alt="" id="sentImage"/></a>}
      </div>
    </div>
  );
};

export default Message;
