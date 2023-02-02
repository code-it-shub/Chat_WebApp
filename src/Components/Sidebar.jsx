import React from 'react'
import Chatbox from './Chatbox'
import Navbar from './Navbar'
import Search from './Search'

const Sidebar = () => {
  return (
    <div className='sidebar' id='slidebar'>
        <Navbar/>
        <Search/>
        <Chatbox/>
    </div>

  )
}

export default Sidebar