import React, { useContext, useState } from "react";
import {
  collection,
  where,
  getDocs,
  query,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../Context/AuthContext";
import '../pages/style.scss'


const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currUser } = useContext(AuthContext);
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
      setUser(null);
    }
  };
  const handleKey = (e) => {
    if (e.target.value === currUser.displayName){
      alert("User already login")
    }
    else{
      handleSearch(e.target.value);
    }  
  };
  const handleSelect = async () => {
    const combinedId =
      currUser.uid > user.uid
        ? currUser.uid + user.uid
        : user.uid + currUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] }); 
        await updateDoc(doc(db, "userChats", currUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
        await updateDoc(doc(db, "userChats", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: currUser.uid,
          displayName: currUser.displayName,
          photoURL: currUser.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    }
    } catch (err) {}
    setUser(null);
    setUserName("");
  };
  return (
    <div className="search">
      <div className="searchform">
        <input
          type="text"
          placeholder="Search User"
          onKeyDown={handleKey}
          onChange={(e) => { 
            e.preventDefault()
            setUserName(e.target.value);
          }}
          value={userName}
        />
      </div>
      {err && <span id="error">User Not found!</span>}
      {user && (
        <div className="userchat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userinfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
