import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/authReducers';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import './utility/axiosConfig';

const store = configureStore({
  reducer: rootReducer,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <AuthProvider>
      <App />
    </AuthProvider>
    {/* </React.StrictMode> */}
  </Provider>,
);
