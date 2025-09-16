import React, { useState, useEffect } from "react";
import Counter from "./Counter.jsx";
import TodoList from "./TodoList.jsx";
import { useRef } from "react";
import Form from "./Form.jsx";

/*
  App demonstrates:
  - composition of function components
  - passing props
  - shared state and callbacks
  - useEffect to run side effects
*/

const MyComponent = (props) =>{
  const [count, setCount] = useState(0);
    let ref = useRef(0);
    function handleClick(){
        ref.current++;
        setCount(count - 1);
        console.log('You clicked ' + ref.current + ' times');
    }
    
    useEffect(() => {
      if(count > 10){
        alert('something was changed');
        setCount(0);
      }
    },[count]);

    return <div>Hello World!
        <button onClick={handleClick}>Click me</button>
        <button onClick={() => setCount(count + 1)}>Click me</button>
        <div>
          <p>{props.name}+' clicked'</p>
          <p>{count}</p>
          <Form/>
        </div>
    </div>
};

export default function App() {
  const [title, setTitle] = useState("React Function Components - Starter");

  // log title changes (side effect)
  useEffect(() => {
    document.title = title;
    console.log("App title set to:", title);
    // cleanup not needed here
  }, [title]);

  return (
    <div className="container">
      <h1>{title}</h1>

      <section>
        <h2>Counter (props + state)</h2>
        <Counter onLimitReached={() => alert("Limit reached!")} />
      </section>

      <section style={{ marginTop: 20 }}>
        <h2>Todo List (lists, keys, effects)</h2>
        <TodoList onTitleChange={(t) => setTitle(t)} />
      </section>

      <section>
        <MyComponent name={title}/>
      </section>

      <footer style={{ marginTop: 20, fontSize: 13, color: "#334155" }}>
        Built with function components • Try editing the components in src/
      </footer>
    </div>
  );
}