import axios from 'axios';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../components/Todo.css';
import Cards from './card';
const Todo = () => {
  const [todo, setTodo] = useState([]);

  const handleTodoCreated = (newTodo) => {
    setTodo([...todo, newTodo]); // Add the new todo to the existing list
  };


  return (
  <>
  <Navbar onTodoCreated={handleTodoCreated}   />
  <Cards todoss={todo} />
  </>
  );
};

export default Todo;      