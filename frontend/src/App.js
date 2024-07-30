import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Admin/Dashboard';
import Home from './pages/Home';
import NotificationPage from './pages/NotificationPage';
import Login from './components/Admin/Login';
import Signup from './components/Admin/Signup';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/sign-up' element={<Signup/>}/>
      <Route path='/admin-dashboard' element={<Dashboard/>} />
      <Route path='/notification' element={<NotificationPage/>} />

    </Routes>
  );
}

export default App;
