import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DatePickerAI from './Components/DatePickerAI'
import {DatePicker} from './Components/DatePicker';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      {/* <DatePickerAI onSelectDate={(event)=>console.log(event)}/> */}
      <DatePicker/>
    </div>
  )
}

export default App
