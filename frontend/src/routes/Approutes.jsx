import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import Login from '../pages/Login'
import Transactions from '../pages/Transactions'
import Dashboard from '../pages/Dashboard'
import Register from '../pages/Register'
import MainLayout from '../layout/MainLayout'
import ProtectedRoute from './ProtectedRoute'

/*
Wrap only protected pages
🔐 Protect these routes:
Profile ✅
Transactions ✅
Dashboard ✅
*/

const Approutes = () => {

    let routepath=createBrowserRouter([
        {
            path:'/',
            element:<MainLayout></MainLayout>,
            children:[
                {
                    index: true,
                    element: <Home />
                },
                {
                    path:'/login',
                    element:<Login></Login>
                },
                {
                    path:'/profile',
                    element:(<ProtectedRoute><Profile></Profile></ProtectedRoute>)
                },
                {
                    path:'/transactions',
                    element:(<ProtectedRoute><Transactions></Transactions></ProtectedRoute>)
                },
                {
                    path:'/dashboard',
                    element:(<ProtectedRoute><Dashboard></Dashboard></ProtectedRoute>)
                },
                {
                    path:'/register',
                    element:<Register></Register>
                }
            ]
        }
    ])

  return (
    <RouterProvider router={routepath}>

    </RouterProvider>
  )
}

export default Approutes