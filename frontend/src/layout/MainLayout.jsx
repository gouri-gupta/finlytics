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
      <div className="flex-1 flex flex-col">

        {/* Top bar */}
        <div className="flex justify-end p-4">
          <ThemeToggle />
        </div>

        {/* Page content */}
        <div className="flex-1 p-4 sm:p-6">
          <Outlet />
        </div>

      </div>

    </div>
  )
}

export default MainLayout