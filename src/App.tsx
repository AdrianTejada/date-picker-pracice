import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DatePickerAI from './Components/DatePickerAI'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <DatePickerAI onSelectDate={(event)=>console.log(event)}/>
    </div>
  )
}

export default App
