import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {DatePicker} from './Components/DatePicker';
import { WeekPicker } from './Components/WeekPicker';

function App() {
  return (
    <>
      <DatePicker/>
      <WeekPicker/>
    </>
  )
}
export default App