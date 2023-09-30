import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SecurityService from '../services/SecurityService';
import { ToastContainer } from 'react-toastify';

function App() {
  const navigate = useNavigate();
  const security = SecurityService.getInstance();
  // TODO useState ou autre pour islogged ?

  useEffect(() => {
    if (security.isLogged === false) {
      navigate('/connect', { replace: true });
    }
  }, []);

  return (
    <div className="App container" id="container_all">
      <ToastContainer />
      <header>
        <h1 className='text-center'>Header</h1>
      </header>
      <main>
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
