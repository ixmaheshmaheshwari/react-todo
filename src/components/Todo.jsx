import { useState } from 'react';
import Navbar from './Navbar';
import Cards from './card';
import { ConfigProvider, Switch } from 'antd';

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };


  const handleTodoCreated = (newTodo) => {
    setTodo([...todo, newTodo]);
  };


  return (
    <>
      <ConfigProvider theme={{ theme }}>
        <div style={{ padding: '20px' }}>
          <Switch checkedChildren="Dark" unCheckedChildren="Light" onChange={toggleTheme} />
        </div>
        <Navbar onTodoCreated={handleTodoCreated} />
        <Cards todoss={todo} />
      </ConfigProvider>
    </>
  )
}

export default Todo;




