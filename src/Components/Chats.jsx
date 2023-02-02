import React from 'react'
import {BsCameraVideo} from 'react-icons/bs'
import {IoCallOutline} from 'react-icons/io5'
import {BsThreeDots} from 'react-icons/bs'
import Messages from './Messages'
import Input from './Input'
import { useContext } from 'react'
import { ChatContext } from '../Context/chatContext'
import '../pages/style.scss'

const Chats = () => {
  const {data} = useContext(ChatContext)
  const handleClick = () =>{
    document.getElementById("chhats").style.display="none"
    document.getElementById("slidebar").style.display="block"
  }
  return (
    <div className='chats' id='chhats'>
        <div className="chatinfo">
            <div className="left">
                <div className='backArrow' onClick={()=>handleClick()}><ion-icon name="arrow-back-outline" style={{color:"white", width:"2rem", height:"1.4rem"}}></ion-icon></div>
                <img src={data.user?.photoURL} alt="" />
                <span>{data.user?.displayName}</span>
            </div>
            <div className="right">
                <BsCameraVideo style={{color: "white"}}/>
                <IoCallOutline style={{color: "white"}}/>
                <BsThreeDots style={{color: "white"}}/>
            </div>
        </div>
        <Messages/>
        <Input/>
    </div>
  )
}

export default Chats