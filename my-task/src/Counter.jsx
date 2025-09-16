import React, { useState } from "react";
import "./App.css";

export default function Counter({initial = 0, onLimitReached}) {
  const [count, setCount] = useState(initial);
  const limit = 10;

  const inc = () =>{
    setCount((d) => {
      const next = d + 1;
      if( next >= limit && typeof onLimitReached === "function"){
        onLimitReached();
        return d;
      }
      return next;
    })
  }

  const dec = () => setCount((d) => Math.max(0, d-1));

  return (
    <div>
      <div className="counter">
        <button onClick={dec} aria-label="decrement">-</button>
        <strong>{count}</strong>
        <button onClick={inc} aria-label="increment">+</button>
      </div>
      <div className="onLimit">
        {count >= limit ? "You've reached the limit": `Limit is ${limit}.`}
      </div>
    </div>
  )
}