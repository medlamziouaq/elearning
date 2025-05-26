import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Web3Provider } from './context/Web3Context'
import { SnackbarProvider } from './context/SnackbarContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Web3Provider>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </Web3Provider>
  </React.StrictMode>,
)
