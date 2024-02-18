import { createContext, useEffect, useState } from "react"
const  ThemeContext  =  createContext(false);
const ThemeChanger = ({ children }) => {
    const  [toggle, setToggle]  =  useState("light");
    const toggleFunction =  ()  =>  {
        setToggle(toggle => (toggle === 'light' ? 'dark' : 'light'));
        document.body.style.backgroundColor={toggle}
};
useEffect(() => {
    // Set initial background color
    document.body.style.backgroundColor = toggle === 'light' ? 'white' : '#1e1e1e';
}, [toggle]);
  return (
    <ThemeContext.Provider value={{ toggle, toggleFunction }}>
        {children}
    </ThemeContext.Provider>
  )
}

export  {  ThemeContext,  ThemeChanger  };