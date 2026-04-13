import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    console.log("Main Layout")
  return (
    <>
    <Sidebar></Sidebar>
    <Outlet></Outlet>
    </>
  )
}

export default MainLayout