import {createContext,useState,useEffect} from 'react'
import toast from 'react-hot-toast'

export let userContext=createContext()

const AuthContext = ({children}) => {

    const [isLogin,setLogin]=useState(false)

    const [user,setUser]=useState({
        name:"",
        email:""
    })

    const loginUser=(obj)=>{
        setLogin(true)
        setUser(obj)
    }

    const logoutUser=()=>{
        setLogin(false)
        setUser({name:"",email:""})
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged out successfully")
    }

    useEffect(()=>{  //runs on initial render
        const token=localStorage.getItem("token")
        if(token  && localStorage.getItem("user")){
            const u=JSON.parse(localStorage.getItem("user")) //convert back to object
            loginUser(u)
        }
    },[]) //persisitence logic

  return (
    <userContext.Provider value={{user,isLogin,loginUser,logoutUser}}>
        {children}
    </userContext.Provider>
  )
}

export default AuthContext

/*
React state = temporary (lost on refresh)
localStorage = persistent (stays after refresh)
*/