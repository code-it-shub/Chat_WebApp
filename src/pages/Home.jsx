import React from 'react'
import Chats from '../Components/Chats'
import Sidebar from '../Components/Sidebar'

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <Sidebar/>
        <Chats/>
      </div>
    </div>
    
    
  )
}

export default Home