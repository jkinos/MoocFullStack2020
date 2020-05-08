import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => <h1>{props.text}</h1>
const Button = ({onClick,text}) => <button onClick = {onClick}>{text}</button>
const Statistic = (props) => <tr><td>{props.text}</td><td>{props.value}{props.unit}</td></tr>

const Statistics = ({good,bad,neutral})=>{
    const all = () => good + bad+ neutral

    const average = () => {
        if (all() === 0) {
            return 0
        } else return (good * 1 + bad * -1) / all()
    }

    const positive = () => {
        if (all() === 0) {
            return 0
        }else {
            return good/all()*100
        }
    }
    if (all()===0){
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }else {

        return (

            <table>
                <tbody>
                <Statistic text = 'good' value = {good}/>
                <Statistic text = 'neutral' value = {neutral}/>
                <Statistic text = 'bad' value= {bad}/>
                <Statistic text = 'all' value = {all()}/>
                <Statistic text = 'average' value={average()}/>
                <Statistic text = 'positive' value={positive()} unit = ' %'/>
            </tbody>
            </table>
        )
    }
}

const App = () => {

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const HandleClickGood =()=> setGood(good + 1)
    const HandleClickNeutral = () => setNeutral (neutral + 1)
    const HandleClickBad = () => setBad (bad + 1)

    return (
        <div>
            <Header text = 'give feedback'/>
            <Button onClick={HandleClickGood} text = 'good'/>
            <Button onClick={HandleClickNeutral} text = 'neutral'/>
            <Button onClick={HandleClickBad} text='bad'/>
            <Header text= 'statistics'/>
            <Statistics good={good} neutral ={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)

