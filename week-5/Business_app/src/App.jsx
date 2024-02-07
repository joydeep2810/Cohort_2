import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const[props,setprops] = useState([{
    id:1,
    title:"Joydeep",
    description:"WEB DEV",
    interest:[Code,Gaming,GYM]
  },{id:2,
  title:"Joydeep",
  description:"WEB DEV",
  interest:[Code,Gaming,GYM]
  }])

  return (
    <>
      <Card >
      id:2,
      title:"Joydeep",
      description:"WEB DEV",
      interest:[Code,Gaming,GYM]
      </Card>
    </>
  )
}

function Card({children}){
  return(
    <div>
      <h1>{children.title}</h1><br />
      <h3>{children.description}</h3><br />
      <h2>Interest</h2><br />
      <h3>{children.interest}</h3><br />
      <button>Twitter</button>
      <button>Linkdin</button>
    </div>
    
  )
}

export default App
