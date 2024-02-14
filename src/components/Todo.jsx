import { useState } from 'react';
import Navbar from './Navbar';
import Cards from './card';


const Todo = () => {
  const [todo, setTodo] = useState([]);

  const handleTodoCreated = (newTodo) => {
    setTodo([...todo, newTodo]); 
  };


  return (
  <>
  <Navbar onTodoCreated={handleTodoCreated} />
  <Cards todoss={todo} />
  </>
  )
}

export default Todo;




  