import { createContext, useState,useEffect } from "react";
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from '../firebase'

export const AuthContext= createContext();

export const AuthContextProvider = ({children}) =>{
  const [currUser,setUser]= useState({});
  useEffect(() => {
    const unsub=onAuthStateChanged(auth, (user) =>{
      setUser(user)
    })
    return () =>{
      unsub();
    }
    
  },[]);
  return(
  <AuthContext.Provider value={{currUser}}>
    {children}
  </AuthContext.Provider>
  )
  
}