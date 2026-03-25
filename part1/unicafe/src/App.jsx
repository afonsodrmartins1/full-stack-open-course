import { useState } from 'react'

const StatisticLine = ({name,count})=> <tr><td>{name}</td><td>{count}</td></tr>;
const Button = ({onClick, name})=> <button onClick={onClick}>{name}</button>;
const Statistics = ({good,neutral,bad})=>{

  return(
  good+neutral+bad != 0 ?
  <>
    <table>
      <tbody>
      <StatisticLine name="good" count= {good}/>
      <StatisticLine name="neutral" count= {neutral}/>
      <StatisticLine name="bad" count= {bad}/>
      <StatisticLine name="all" count={good+bad+neutral}/>
      <StatisticLine name="average" count={(( good - bad)/(good+bad+neutral))||0}/>
      <StatisticLine name="positive" count={(good+bad+neutral)>0? 
      (good/(good+bad+neutral)*100)+"%" : "0%"}/>
      </tbody>
    </table>  

  </> : <p>No feedback given</p>
  )
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incGood=()=>{
  
  setGood(good+1);
  }
  const incNeutral=()=>{
  setNeutral(neutral+1);
  }

  const incBad=()=>{
  setBad(bad+1);
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={incGood} name="good"></Button>
      <Button onClick={incNeutral} name="neutral"></Button>
      <Button onClick={incBad} name="bad"></Button>
      
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      

    </div>
  )
}

export default App