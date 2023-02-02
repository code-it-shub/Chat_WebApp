import { updateDoc,arrayUnion,Timestamp ,doc,serverTimestamp } from 'firebase/firestore'
import { useState,useContext } from 'react'
import { storage } from "../firebase";
import {SlPicture} from 'react-icons/sl'
import { getDownloadURL, ref, uploadBytesResumable , } from "firebase/storage";
import { AuthContext } from '../Context/AuthContext'
import { ChatContext } from '../Context/chatContext'
import { v4 as uuid} from 'uuid'
import { db } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Input = () => {
  const [ text ,setText] = useState("")
  const [ image , setImage] = useState(null)
  const {data} = useContext(ChatContext)
  const {currUser} = useContext(AuthContext)
  const handleClick = async() =>{
    if(image){
      const storageRef = ref(storage, uuid());
      const uploadTask= uploadBytesResumable(storageRef,image)
      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currUser.uid,
                date: Timestamp.now(),
                image: downloadURL,
              }),
            });
          });
        }
      );

    }else if(text){
      await updateDoc(doc(db,"chats", data.chatId),{
        messages:arrayUnion({
          id:uuid(),
          text,
          senderId:currUser.uid,
          date: Timestamp.now(),
        })
      })
    }
    else{
      toast.error("Enter your Message",{position:"top-center" ,theme: "light",})
    }
    await updateDoc(doc(db, "userChats", currUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
    setImage(null);
  }
  return (
    <div className='input'>
      <input type="text" name="" id="Message" placeholder='Enter your Message' onChange={(e)=>setText(e.target.value)} value={text}/>
      <div className="send">
        <input type="file" name="" id="filesend" style={{display:"none"}} onChange={(e)=>setImage(e.target.files[0])} />
        <label htmlFor="filesend">
            <SlPicture style={{color: "rgb(0, 61, 107)" , transform:"scale(2)", margin:"20px"}}/>
        </label>
        <button onClick={handleClick}>Send</button>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Input