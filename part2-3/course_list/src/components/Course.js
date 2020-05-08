import React from "react";

const Course = ({course}) => {

    const Header = () => (<h2>{course.name} </h2>)
    const Part = ({name,exercises}) => <p>{name} {exercises}</p>

    const Content = () => {
        const rows = () => course.parts.map(part =>
            <Part
                key={part.id}
                name={part.name}
                excercises={part.exercises}
            />)
        return rows()
    }

    const Total =() => {
        const numberOfExercises = ()=> {
            const reducer = (accumulator,currentValue) => accumulator + currentValue
            const exercises = course.parts.map(part => part.exercises)
            return exercises.reduce(reducer,0)
        }
        return (<p><b>Number of exercises {numberOfExercises()}</b></p>)
    }

    return (
        <div>
            <Header/>
            <Content/>
            <Total/>
        </div>
    )
}

export default Course