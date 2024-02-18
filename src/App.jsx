import { useState } from 'react'
import Todo from './components/Todo'
import { ThemeChanger } from './components/ThemeChanger'
function App() {
  const [count, setCount] = useState(0)
  
  
  return (
    <>
    <ThemeChanger>
    <Todo/>
    </ThemeChanger>
    
   
    </>
  )
}

export default App
