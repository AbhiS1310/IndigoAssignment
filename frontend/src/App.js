import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Admin/Dashboard';
import Home from './components/Home';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/admin-dashboard' element={<Dashboard/>} />
    </Routes>
  );
}

export default App;
