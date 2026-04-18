import {useContext} from 'react'
import { NavLink,Link } from 'react-router-dom'
import { userContext } from '../context/AuthContext'
import { CgProfile } from "react-icons/cg";
import { TbTransactionRupee } from "react-icons/tb";
import { RiDashboardLine } from "react-icons/ri";
import { IoLogOut,IoLogIn } from "react-icons/io5";

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
              <NavLink to="/profile"><span><CgProfile/></span>Profile</NavLink>
            </li>
            <li>
              <NavLink to="/transactions"><span><TbTransactionRupee/></span>Transactions</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard"><span><RiDashboardLine/></span>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/" onClick={logoutUser}><span><IoLogOut/></span>Logout</NavLink>   
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink to="/login" ><span><IoLogIn/></span>Login</NavLink>
            </li>
          </ul>
        )
      }
    </main>
  )
}

export default Sidebar