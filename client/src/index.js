import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/reducer';
import { Toaster } from 'react-hot-toast';


const store = configureStore({
  reducer: rootReducer,

});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: '12px',
              background: '#e8e8e8',
              color: '#101010',
              boxShadow: '0 12px 35px rgba(15, 23, 42, 0.35)',
              fontSize: '0.95rem',
              fontFamily: '"Inter", "Poppins", sans-serif',
              fontWeight: '500',
            },
            success: {
              iconTheme: {
                primary: '#22c55e',
                secondary: '#ffffff',
              },
            },
            error: {
              style: {
                borderRadius: '12px',
                background: '#dc2626',
                color: '#ffffff',
                boxShadow: '0 12px 35px rgba(220, 38, 38, 0.25)',
                fontSize: '0.95rem',
                fontFamily: '"Inter", "Poppins", sans-serif',
                fontWeight: '500',
              },
              iconTheme: {
                primary: '#ffffff',
                secondary: '#dc2626',
              },
            },
          }}
        />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();