import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/index.scss';
import App from './components/App';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from './components/Home';
import Connect from './components/Connect';
import { actionLogin } from './actions/SecurityAction'
import { actionAddTerm } from './actions/TermAction';
import { actionAddCard } from './actions/CardAction';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

/**
 * Routes et actions, import du scss
 */
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="" element={<App />}>
    <Route path="/connect" element={<Connect />} />
    <Route path="*" element={<Home />} >
    </Route>
    </Route>
    <Route path="/login" action={actionLogin} />
    <Route path="/addTerm" action={actionAddTerm} />
    <Route path="/addCard" action={actionAddCard} />
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
