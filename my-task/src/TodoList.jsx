import React, { useState, useEffect } from "react";

export default function TodoList({onTitleChange}){
  const [items, setItems] = useState(() => {
    try {
      const raw= localStorage.getItem("todos-demo");
      return raw? JSON.parse(raw) : ["Learn components", "Use hoos"];
    } catch{
      return ["Learn components", "Use hooks"];
    }
  });
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos-demo", JSON.stringify(items));
  }, [items]);

  useEffect(() =>{
    console.log("title was changed");
    if(typeof onTitleChange === "function") {
      onTitleChange(`Todos (${items.length}) `);
    }
  }, [items, onTitleChange]);

  function addItem(e) {
    e.preventDefault();
    if(!text.trim()) {
      alert("Plz follow input style");
      return;
    };
    setItems((prev)=> [...prev, text.trim()]);
    setText("");
  }

  function removeItem(index) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  const visible = items.filter((_, i) => {
    if( filter === "all" ) return true;
    if( filter === "even" ) return i % 2 === 0;
    if( filter === "odd" ) return i % 2 === 1;
    return true;
  });

  return (
    <div>
      <form onSubmit={addItem} style={{marginBottom: 10}}>
        <input
          placeholder="New todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <div style={{marginBottom: 8}}>
        Show:
        <select value={filter} onChange={(e)=> setFilter(e.target.value)} style={{marginLeft:8}}>
          <option value="all">All</option>
          <option value="even">Even index</option>
          <option value="odd">Odd index</option>
        </select>
      </div>

      <ul>
        {visible.map((item, idx) => (
          <li key = {` ${item}-${idx}`} style={{marginBottom: 6}}>
            {item}{" "}
            <button onClick={() => removeItem(items.indexOf(item))} style = {{marginLeft:6}}>
              remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}