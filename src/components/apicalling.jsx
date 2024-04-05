import axios from 'axios'
import React, { Fragment } from 'react'

const Apicalling = () => {
   const data=async()=>{await axios.get("https://jsonplaceholder.typicode.com/todos").then((response)=>{
    console.log(response.data);
   })
}
let todo=  data();
console.log(todo)
  return (
    <>
   {
      todo &&  todo.map((todos)=>{
<div>{todos.title}</div>
        })}
    
    <div>A</div>
    </>
  )
}

export default Apicalling