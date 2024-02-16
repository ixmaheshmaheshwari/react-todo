import { useState } from 'react';
import Navbar from './Navbar';
import Cards from './card';
import { ConfigProvider, Switch } from 'antd';

const Todo = () => {
  const [todo, setTodo] = useState([]);
 

  const handleTodoCreated = (newTodo) => {
    setTodo([...todo, newTodo]);
  };


  return (
    <>
      
        <div style={{ padding: '20px' }}>
          <Switch checkedChildren="Dark" unCheckedChildren="Light" onChange={toggleTheme} />
        </div>
        <Navbar onTodoCreated={handleTodoCreated} />
        <Cards todoss={todo} />
     
    </>
  )
}

export default Todo;




