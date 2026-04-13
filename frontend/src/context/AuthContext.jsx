import {createContext,useState} from 'react'
import toast from 'react-hot-toast'

export let userContext=createContext()

const AuthContext = ({children}) => {

    const [isLogin,setLogin]=useState(false)

    const loginUser=()=>{
        setLogin(true)
    }

    const logoutUser=()=>{
        setLogin(false)
        toast.success("Logged out successfully")
    }

  return (
    <userContext.Provider value={{isLogin,loginUser,logoutUser}}>
        {children}
    </userContext.Provider>
  )
}

export default AuthContext