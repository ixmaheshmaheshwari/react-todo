import { useContext, useState } from 'react';
import Navbar from './Navbar';
import Cards from './card';
import { ThemeContext } from './ThemeChanger';
import { Switch } from 'antd';

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const { toggleFunction } = useContext(ThemeContext);

  const handleTodoCreated = (newTodo) => {
    setTodo([...todo, newTodo]);
  };


  return (
    <>
      
       <Switch style={ {
    width: "6pc",
    marginTop: "2pc",
    marginLeft: "3pc"
}}
        onChange={toggleFunction}checkedChildren={"dark"} unCheckedChildren={"light"}></Switch>
        <Navbar onTodoCreated={handleTodoCreated} />
        <Cards todoss={todo} />
     
    </>
  )
}

export default Todo;




