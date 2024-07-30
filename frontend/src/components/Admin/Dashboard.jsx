import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Header from '../Layout/Header';
import axios from 'axios';
import Flights from '../Flights/Flights';
import Notifications from '../Notifications/Notifications';
import AddFlight from './AddFlight';
import UpdateStatus from './UpdateStatus';
import { server } from "../../server";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user,setUser] = useState("");

  useEffect(()=>{
    const loadUser = async ()=>{
      const { data } = await axios.get(`${server}/auth/getuser`,{
        withCredentials: true,
      });
      setUser(data);
    }
    loadUser();
  })
  if(!user){
    return <Navigate to="/login" replace/>
  }
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`relative bg-gray-800 text-white p-4 transition-transform duration-300 ${
          isSidebarOpen ? 'w-64 translate-x-0' : 'w-16 -translate-x-64'
        }`}
      >
        {/* Sidebar Content */}
        {isSidebarOpen && (
          <>
            <button
              onClick={toggleSidebar}
              className="absolute top-4 right-[-1.5rem] bg-gray-700 text-white p-2 rounded-full focus:outline-none transition-transform hover:bg-gray-600"
            >
              &gt;
            </button>
            <h1 className="text-xl font-bold mb-6">Dashboard</h1>
            
            <nav className="space-y-4">
              <Link
                to="#"
                onClick={() => handleTabClick('home')}
                className={`block text-gray-300 hover:text-white ${activeTab === 'home' ? 'text-yellow-500' : ''}`}
              >
                Home
              </Link>
              <Link
                to="#"
                onClick={() => handleTabClick('about')}
                className={`block text-gray-300 hover:text-white ${activeTab === 'about' ? 'text-yellow-500' : ''}`}
              >
                All Notify Users
              </Link>
              <Link
                to="#"
                onClick={() => handleTabClick('services')}
                className={`block text-gray-300 hover:text-white ${activeTab === 'services' ? 'text-yellow-500' : ''}`}
              >
                All Flights
              </Link>
              <Link
                to="#"
                onClick={() => handleTabClick('contact')}
                className={`block text-gray-300 hover:text-white ${activeTab === 'contact' ? 'text-yellow-500' : ''}`}
              >
                Add Flights
              </Link>
            </nav>
            <footer className="absolute bottom-4 left-4 text-gray-400">
              <p>&copy; Abhishek</p>
            </footer>
          </>
        )}
      </div>

      {/* Show Sidebar Button */}
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 bg-gray-700 text-white p-2 rounded-full focus:outline-none transition-transform hover:bg-gray-600"
        >
          &lt;
        </button>
      )}

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all ${isSidebarOpen ? 'ml-6' : 'ml-11'}`}>
        {/* Header */}
        <header className="bg-white shadow-md border-b border-gray-300">
          <Header />
        </header>

        {/* Content */}
        <div className="flex-1 p-4 bg-white">
          {activeTab === 'home' && (
            <div>
              <h2 className="text-2xl font-bold">Home</h2>
              <p>Welcome to the home page!</p>
            </div>
          )}
          {activeTab === 'about' && (
            <div>
              <h2 className="text-2xl font-bold">All Prference Flight Users</h2>
              <Notifications/>
            </div>
          )}
              {activeTab === 'flight-status' && (
            <div>
            <UpdateStatus/>
            </div>
          )}
          {activeTab === 'services' && (
            <div>
             <Flights/>
            </div>
          )}
          {activeTab === 'contact' && (
            <div>
             <AddFlight/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard
