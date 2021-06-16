import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import './index.css';

if (module.hot) module.hot.accept();

ReactDOM.render(

  <React.StrictMode>
    <BrowserRouter>
      <App />
   </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);