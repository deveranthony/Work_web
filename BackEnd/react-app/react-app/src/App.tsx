import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Counter from './components/Counter'
import TodoApp from './components/TodoApp'
import UserProfile from './components/UserProfile'

function Home(){
  const navigate = useNavigate();
  return (
    <>
    <header className="app-header">
        <h1>React + <button onClick={()=>navigate('/')}>Vite</button> + TypeScript + Redux Template</h1>
        <p>A comprehensive template with Redux slices for state management</p>

      </header>

      <div className="component-card">
            <h2>Counter Slice</h2>
            <Counter />
          </div>
      </>
    
  )
}

function About(){
  const navigate = useNavigate();

  return(
    <>
    <header className="app-header">
    <h1>React + <button onClick={()=>navigate('/')}>Vite</button> + TypeScript + Redux Template</h1>
        <p>A comprehensive template with Redux slices for state management</p>

      </header>
      <div className="component-card">
            <h2>User Management Slice</h2>
            <UserProfile />
          </div>
      </>
  )
}

function Contact(){
  const navigate = useNavigate();
  return(
<>
<header className="app-header">
    <h1>React + <button onClick={()=>navigate('/')}>Vite</button> + TypeScript + Redux Template</h1>
        <p>A comprehensive template with Redux slices for state management</p>

      </header>

      <div className="component-card">
            <h2>Todo App Slice</h2>
            <TodoApp />
          </div>
      </>
  )
}

function MyHome(){
  const navigate = useNavigate();
  return(
    <div className="app">
      <main className="app-main">
        <h1>MyHomePage</h1>
        <div className="components-grid">
          
      <button onClick={()=>navigate('/home')}>Go Home</button>
      <button onClick={()=>navigate('/about')}>Go About</button>
      <button onClick={()=>navigate('/contact')}>Go Contact</button>
        </div>
      </main>
    </div>
  )
}
function App() {
  return (
    <Routes>
      <Route path='/' element={<MyHome/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
    </Routes>
  )
}

export default App
