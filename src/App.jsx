import { useState } from "react";
import Todo from "./components/Todo";
import { ThemeChanger } from "./components/ThemeChanger";
import Apicalling from "./components/apicalling";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ThemeChanger>
        <Todo />
      </ThemeChanger>
      {/* <Apicalling/> */}
    </>
  );
}

export default App;
