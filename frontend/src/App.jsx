import React from 'react'
import AuthContext from './context/AuthContext'
import {Toaster} from 'react-hot-toast'
import Approutes from './routes/Approutes'

const App = () => {
  return (
    <AuthContext>
      <Toaster></Toaster>
      <Approutes></Approutes>
    </AuthContext>
  )
}

export default App
//using React router v6