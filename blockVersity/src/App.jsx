import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {
  logIn,
  currentUser,
  logOut,
} from "./Flow/actions";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    currentUser().subscribe(setUser);
  }, []);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h1>User's Address: {user?.addr}</h1>
      <div className="card">
        <button onClick={() => logIn()}>
          Connect
        </button>
        <button onClick={() => logOut()}>
          Disconnect
        </button>
      </div>
    </div>
  )
}

export default App
