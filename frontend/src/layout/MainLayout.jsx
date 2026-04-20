import React from 'react'
import Sidebar from '../components/Sidebar'
import ThemeToggle from '../components/ThemeToggle'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-6">

        {/* Top right toggle */}
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>

        <Outlet />
      </div>

    </div>
  );
};
export default MainLayout