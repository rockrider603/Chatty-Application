import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/*BrowserRouter is present to not reload the page again and again and just have a smooth transition between pages*/}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)