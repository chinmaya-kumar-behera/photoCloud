import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from "react-hot-toast";
import './index.css';
import "./styles/components/_dialog.css";
import "./styles/animation.css";

// import "./styles/globals.css"


import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>
);

reportWebVitals();
