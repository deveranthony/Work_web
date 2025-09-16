import './App.css'

function Canvas() {
  return(
    <>
      <h1>Snake</h1>
        <div className='gamearea'>
          <canvas id='gameCanvase' width={400} height={400} aria-label='Snake Game'></canvas>
        </div>
    </>    
  )
}

function Asside(){
  return(
    <>
      <aside className='hud'>
        <div className='scoreboard'>
          <div>Score: <span id='score'>0</span></div>
          <div>High: <span id='highScore'>0</span></div>
        </div>

        <div className='controls'>
          <button id='startBtn'>Start</button>
          <button id='pauseBtn'>Pause</button>
          <button id='restartBtn'>Restart</button>
        </div>

        <div className='hint'>
          Controls: Arrow keys or WASD
        </div>

        <div className='mobile-controls' id='mobileControls' aria-hidden='true'>
          <button data-dir='up'>↑</button>
          <div className='h-row'>
            <button data-dir='left'>←</button>
            <button data-dir='down'>↓</button>
            <button data-dir='right'>→</button>
          </div>
        </div>

      </aside>
    </>
  )
}
function App() {

  return (
    <>
      <main className='container'>
        <Canvas/>
        <Asside/>
      </main>
    </>
  )
}

export default App
