import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import {auth} from '../firebase'
import { AuthContext } from '../Context/AuthContext'

const Navbar = () => {
  const {currUser} =useContext(AuthContext)
  return (
    <div className='navbar'>
    <span className='logo'>PChatApp</span>  
    <div className="user">
        <img src={currUser.photoURL} alt="" />
        <span>{currUser.displayName}</span>
        <button onClick={()=>signOut(auth)} id="btn" style={{display:"none"}}></button>
        <label htmlFor='btn' className="bttn" ><ion-icon name="log-out-outline" className="bttn1" style={{width:"2rem", height:"1.5rem"}}></ion-icon></label>
    </div>

    </div>
  )
}

export default Navbar