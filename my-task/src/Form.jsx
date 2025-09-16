import { useRef , useState, useContext } from "react";
import { createContext } from "react";

const ColorContext = createContext();

export default function Form(){
  const [color, setColor] = useState('blue');
  const inputRef = useRef(0);



  function handleClick(){
    inputRef.current.focus();
  }

  return (
    <ColorContext.Provider value={{ color, setColor }}>
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus</button>
      <MyRoom />
    </ColorContext.Provider>
  )
}

// Your Room Component
function MyRoom() {
   // You own the light & remote
  const { color, setColor } = useContext(ColorContext);

  function handleClick(){
    setColor('red');
  };

  function handleClickGreen(){
    setColor('green');
  };
  // You pass the remote (setColor) to your sibling's room via a prop
  return (
    <div style={{ backgroundColor: "white" }}>
      <h1 style={{ color: color }}>My Room is {color}</h1>
      <button onClick={handleClick}>Turn My Room RED</button>
      <button onClick={handleClickGreen}>Turn My Room GREEN</button>
      {/* Give Sibling's Room the remote control */}
      <div style={{ color: color }}><SiblingsRoom changeLight={setColor} /></div>
    </div>
  );
}

// Your Sibling's Room Component
function SiblingsRoom(props) {
  // Their room received the `changeLight` prop, which is YOUR setColor function!

  return (
    <div>
      <h2 style={{ color: props.color }}>Sibling's Room</h2>
      {/* When they click this button, they use the remote you gave them */}
      <button onClick={() => props.changeLight('yellow')}>
        Turn Sibling's Light YELLOW
      </button>
      <button onClick={() => props.changeLight('purple')}>
        Turn Sibling's Light PURPLE
      </button>
      <Room color={props.color} />
    </div>
  );
}

function Room(){
  const { color } = useContext(ColorContext);
  return (
    <div>
      <h1 style={{ color: color }}>Room</h1>
    </div>
  );
}