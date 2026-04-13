import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import Login from '../pages/Login'
import Transactions from '../pages/Transactions'
import Dashboard from '../pages/Dashboard'
import Register from '../pages/Register'
import MainLayout from '../layout/MainLayout'



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
                    element:<Profile></Profile>
                },
                {
                    path:'/transactions',
                    element:<Transactions></Transactions>
                },
                {
                    path:'/dashboard',
                    element:<Dashboard></Dashboard>
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