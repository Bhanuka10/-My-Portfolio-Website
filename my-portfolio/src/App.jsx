import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navigation from './Component/Navigation/Navigation'
import Profile from './Component/Profile/Profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Navigation />  
        <Profile />
      </div>
    </>
  )
}

export default App
