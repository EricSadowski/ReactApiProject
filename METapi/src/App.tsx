import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GetImage from './GetImage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <GetImage/>
    </>
  )
}

export default App
