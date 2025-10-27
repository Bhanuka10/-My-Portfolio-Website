import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
import Contact from './Component/Contact/Contact'
import Languages from './Component/Languages/Languages'
import Projects from './Component/Projects/Projects'
import Explore_project from './Component/Explore_project/Explore_project'
import Email from './assets/Email/Email'
import Footer from './Component/Footer/Footer'

// Home component that contains all your main sections
const Home = () => {
  return (
    <>
      <Navigation />  
      <Profile />
      <AboutMe />
      <Contact />
      <Languages />
      <Education />
      <Skill />
      <Projects />
      <Email />
      <Footer />
    </>
  );
};

function App() {
  const [count, setCount] = useState(0)
  
  // Get the base path from environment or use default for Vercel deployment
  const basename = import.meta.env.VITE_BASE_PATH || '/';

  return (
    <Router basename={basename}>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore-project" element={<Explore_project />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
