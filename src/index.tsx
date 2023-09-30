import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import './scss/index.scss';
import App from './components/App';
import { useNavigate, ActionFunctionArgs, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import SecurityService from './services/SecurityService';
import Home from './components/Home';
import Connect from './components/Connect';
//import reportWebVitals from './reportWebVitals';
import { actionLogin } from './actions/security'
import loaderColumns from './loaders/ColumLoader';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const security = SecurityService.getInstance();

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="" element={<App />}>
    <Route path="/connect" element={<Connect />} />
    <Route path="*" element={<Home />} >
    </Route>
    </Route>
    <Route path="/login" action={actionLogin} />
    </>
  )
)



root.render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
