import React from "react";

const Person = (props)=> <div>{props.name} {props.number} <button onClick={props.removePerson}>delete</button></div>
export default Person