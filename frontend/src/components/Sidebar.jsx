import { useContext, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { userContext } from '../context/AuthContext'
import { CgProfile } from "react-icons/cg";
import { TbTransactionRupee } from "react-icons/tb";
import { RiDashboardLine } from "react-icons/ri";
import { IoLogOut, IoLogIn } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";

const Sidebar = () => {

  const { isLogin, logoutUser } = useContext(userContext)
  const [open, setOpen] = useState(false)

  return (
    <div className=''>
      {/* 🔹 HAMBURGER (MOBILE ONLY) */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white dark:bg-[#1E293B] shadow"
      >
        <HiMenu className="text-2xl text-gray-800 dark:text-white" />
      </button>

      {/* 🔹 OVERLAY */}
      {
        open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
        )
      }

      {/* 🔹 SIDEBAR */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-60 
        bg-white dark:bg-[#020617] 
        border-r border-gray-300 dark:border-gray-700 
        flex flex-col gap-10 p-4
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static
      `}>

        {/* 🔹 CLOSE BUTTON (MOBILE) */}
        <button
          onClick={() => setOpen(false)}
          className="lg:hidden self-end mb-2"
        >
          <HiX className="text-2xl text-gray-700 dark:text-gray-300" />
        </button>

        {/* 🔹 LOGO */}
        <div className='font-extrabold text-3xl italic text-[#4F46E5]'>
          <Link to="/">Finlytics</Link>
        </div>

        {/* 🔹 MENU */}
        {
          isLogin ? (
            <ul className='flex flex-col gap-4'>

              <li>
                <NavLink to="/profile">
                  {({ isActive }) => (
                    <div className={`flex items-center gap-3 text-lg font-semibold p-2 rounded-lg
                      ${isActive ? 'text-[#4F46E5]' : 'text-gray-400'}
                      hover:bg-indigo-50 dark:hover:bg-[#1E293B]`}>
                      <CgProfile className='text-2xl' />
                      Profile
                    </div>
                  )}
                </NavLink>
              </li>

              <li>
                <NavLink to="/transactions">
                  {({ isActive }) => (
                    <div className={`flex items-center gap-3 text-lg font-semibold p-2 rounded-lg
                      ${isActive ? 'text-[#4F46E5]' : 'text-gray-400'}
                      hover:bg-indigo-50 dark:hover:bg-[#1E293B]`}>
                      <TbTransactionRupee className='text-2xl' />
                      Transactions
                    </div>
                  )}
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard">
                  {({ isActive }) => (
                    <div className={`flex items-center gap-3 text-lg font-semibold p-2 rounded-lg
                      ${isActive ? 'text-[#4F46E5]' : 'text-gray-400'}
                      hover:bg-indigo-50 dark:hover:bg-[#1E293B]`}>
                      <RiDashboardLine className='text-2xl' />
                      Dashboard
                    </div>
                  )}
                </NavLink>
              </li>

              <li>
                <NavLink to="/" onClick={logoutUser}>
                  {({ isActive }) => (
                    <div className={`flex items-center gap-3 text-lg font-semibold p-2 rounded-lg
                      ${isActive ? 'text-[#4F46E5]' : 'text-gray-400'}
                      hover:bg-indigo-50 dark:hover:bg-[#1E293B]`}>
                      <IoLogOut className='text-2xl' />
                      Logout
                    </div>
                  )}
                </NavLink>
              </li>

            </ul>
          ) : (
            <ul>
              <li>
                <NavLink to="/login">
                  {({ isActive }) => (
                    <div className={`flex items-center gap-3 text-lg font-semibold p-2 rounded-lg
                      ${isActive ? 'text-[#4F46E5]' : 'text-gray-400'}
                      hover:bg-indigo-50 dark:hover:bg-[#1E293B]`}>
                      <IoLogIn className='text-2xl' />
                      Login
                    </div>
                  )}
                </NavLink>
              </li>
            </ul>
          )
        }

      </aside>
    </div>
  )
}

export default Sidebar