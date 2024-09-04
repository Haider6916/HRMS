import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from './Routes/AppRouter';
import "antd/dist/antd.css";

function App() {
  return (
    <div>
      {/* app router from Routes folder */}
      <AppRouter/>
    </div>
  );
}

export default App;
