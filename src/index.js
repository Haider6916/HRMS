import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// coolvetica font
import './Assets/fonts/coolvetica.otf';
import App from './App';
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import {theme} from './themes/ColorPallete';
import { CssBaseline } from "@mui/material";
// redux
import { Provider } from 'react-redux'
// redux-persist
import { PersistGate } from "redux-persist/integration/react";
import { store,persistor } from "./Redux/Store";
import { AuthProvider } from './context/AuthProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    {/* Approuter[Routes] is defined in App */}
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/*' element={ <App />}/>
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
    </PersistGate>
    </Provider>
  </React.StrictMode>
);
