import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navigation from './Component/Navigation/Navigation'
import Profile from './Component/Profile/Profile'
import About from './Component/About/About'
import Chatbot from './Component/Chatbot/Chatbot'
import AboutMe from './Page/AboutMe'
import Education from './Component/Education/Education'
import Skill from './Component/Skill/Skill'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Navigation />  
        <Profile />
       <AboutMe />
       <Education />
       <Skill />
      </div>
    </>
  )
}

export default App
