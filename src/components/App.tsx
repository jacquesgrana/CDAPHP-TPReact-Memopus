import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SecurityService from '../services/SecurityService';
import { ToastContainer } from 'react-toastify';
import Header from './Header';
import Footer from './Footer';

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
      <Header></Header>
      <main>
        <Outlet />
      </main>
      <Footer></Footer>
      
    </div>
  );
}

export default App;
/*
      <header>
        <h1 className='text-center'>Header</h1>
      </header>

      <footer>
        <h2 className='text-center'>Footer</h2>
      </footer>
*/