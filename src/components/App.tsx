import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SecurityService from '../services/SecurityService';
import { ToastContainer } from 'react-toastify';
import Header from './Header';
import Footer from './Footer';
import Modal from 'react-modal';

function App() {
  const navigate = useNavigate();
  const security = SecurityService.getInstance();
  const [isLogged, setIsLogged] = useState<boolean>(security.isLogged);
  // TODO useState ou autre pour islogged ?

  Modal.setAppElement('#root');
  // ne sert a rien ?
  useEffect(() => {
    if (security.isLogged === false) {
      navigate('/connect', { replace: true });
      setIsLogged(false);
    }
    else {
      setIsLogged(true);
      //console.log('app.tsx : isLogged :', isLogged);
    }
  }, [security.isLogged]);

  return (
    <div className="App container" id="container_all">
      <ToastContainer />
      <Header isLogged={isLogged}></Header>
      <main>
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;