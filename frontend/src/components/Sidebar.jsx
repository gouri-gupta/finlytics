import {useContext} from 'react'
import { NavLink,Link } from 'react-router-dom'
import { userContext } from '../context/AuthContext'


//this sidebar will always be displayed

//here later while designing we will have a toggle button so that the user can switch between dark and light theme

const Sidebar = () => {

  const {isLogin,logoutUser}=useContext(userContext)

  

  return (
    <main>

      <div>
        <Link to="/">Finlytics</Link>
      </div>

      {
        isLogin ? (
          <ul>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/transactions">Transactions</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/">Logout</NavLink>   
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink to="/login" >Login</NavLink>
            </li>
          </ul>
        )
      }
    </main>
  )
}

export default Sidebar