import React from 'react';
import { Outlet } from 'react-router-dom';
//import logo from './logo.svg';
//import './App.css';

function App() {
  return (
    <div className="App container" id="container_all">
      <header>
        <h1 className='text-center'>Header</h1>
      </header>
      <main>
        <h2 className='text-center'>Test</h2>
        <main>
        <Outlet />
      </main>
      </main>
      <footer>
      <h2 className='text-center'>Footer</h2>

      </footer>
    </div>
  );
}

export default App;
