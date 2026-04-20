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
    <main className='border border-gray-400   flex flex-col gap-10 p-2'>

      <div className='font-extrabold    lg:text-6xl italic text-[#4F46E5] lg:m-2 p-1'>
        <Link to="/" >Finlytics</Link>
      </div>

      {
        isLogin ? (
          <ul className='lg:min-w-48  flex flex-col gap-5 bg-gray-100 dark:bg-[#0F172A] h-full'> {/**border border-red-400 */}
            <li>
              <NavLink to="/profile" className={({ isActive }) => (isActive ? 'text-[#4F46E5]' 
                : ' text-gray-400')}> <div className='border border-gray-500  rounded-lg flex flex-row gap-1 text-2xl font-semibold p-1 hover:bg-indigo-50'><span className='text-4xl'><CgProfile/></span>Profile</div></NavLink>
            </li>
            <li>
              <NavLink to="/transactions" className={({ isActive }) => (isActive ? 'text-[#4F46E5]' 
                : 'text-gray-400')}> <div className='border border-gray-500  rounded-lg flex flex-row gap-1 text-2xl font-semibold p-1 hover:bg-indigo-50'><span className='text-4xl'><TbTransactionRupee/></span>Transactions</div></NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'text-[#4F46E5]' 
                : 'text-gray-400')}> <div className='border border-gray-500  rounded-lg flex flex-row gap-1 text-2xl font-semibold p-1 hover:bg-indigo-50'><span className='text-4xl'><RiDashboardLine/></span>Dashboard</div></NavLink>
            </li>
            <li>
              <NavLink to="/" onClick={logoutUser} className={({ isActive }) => (isActive ? 'text-[#4F46E5]' 
                : 'text-gray-400')}> <div className='border border-gray-500  rounded-lg flex flex-row gap-1 text-2xl font-semibold p-1 hover:bg-indigo-50'><span className='text-4xl'><IoLogOut/></span>Logout</div></NavLink>   
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink to="/login" className={({ isActive }) => (isActive ? 'text-[#4F46E5]' 
                : 'text-gray-400')}> <div className='border border-gray-500  rounded-lg flex flex-row gap-1 text-2xl font-semibold p-1 hover:bg-indigo-50'><span className='text-4xl'><IoLogIn/></span>Login</div></NavLink>
            </li>
          </ul>
        )
      }
    </main>
  )
}

export default Sidebar