import {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { TbTargetArrow } from "react-icons/tb"
import { MdInsights } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { RiBarChartBoxFill } from "react-icons/ri";
import { FaArrowDown,FaArrowLeft,FaArrowRight,FaArrowUp } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";

import { userContext } from '../context/AuthContext'
/*
Tagline (big text)    Logo (somewhat bigger)
Small description (1 line)
CTA button:“Get Started” / “Login”
*/

const Home = () => {

  let navigate=useNavigate()
    const {isLogin,logoutUser}=useContext(userContext)


  const getStarted=()=>{
    navigate("/login")
  }

  return (
    <main className=' flex flex-col gap-10'> {/**border border-black */}
      
      <section className='  flex flex-col gap-5 p-1'> {/**border border-red-800 */}
        <div className='flex flex-row gap-1'>  {/**tagline */}
          <h1 className='text-[#111827]  lg:text-4xl md:text-2xl   font-[700]  dark:text-[#F9FAFB]'>Where does your money actually go?</h1>
          <span className='text-5xl'><GiTakeMyMoney/></span>
        </div>
        {/**Add logo also here in big */}

        <div className='flex flex-col gap-1'> {/**small descripiton */}
          <h3 className='text-[#6B7280] lg:text-xl font-semibold italic dark:text-[#9CA3AF]'>Most people earn and spend — but never truly understand their finances.</h3>
          <h3 className='text-[#6B7280] lg:text-xl font-semibold italic dark:text-[#9CA3AF]'>Finlytics turns your transactions into clear insights so you can make smarter decisions.</h3>
        </div>

        {
          !isLogin && 
        <div className='m-2'>
          <button onClick={getStarted} className='bg-indigo-500 border-2 border-indigo-950  text-xl text-white font-bold px-2 py-1 rounded-lg hover:bg-indigo-900'>Start Tracking Your Finances</button>
        </div>
        }
      </section>

      {/**Purpose of this project */}
      <section className='  grid lg:grid-cols-2 md:grid-cols-1  gap-5'> {/**border border-purple-900 m-1 */}
        
        <div className='border border-gray-600 rounded-lg m-1 p-5 bg-white dark:bg-[#1E293B] flex flex-col shadow-md   hover:scale-105 hover:shadow-xl'>
          <div className='flex flex-row justify-center gap-1'>
            <span className='text-[#4F46E5] text-2xl'><FaRegEye/></span>
            <h1 className='text-[#111827] dark:text-[#F9FAFB] font-bold text-xl'>Awareness</h1>
          </div>
          <p className='text-center text-[#6B7280] dark:text-[#9CA3AF] font-semibold'>Track every transaction and filter your spending patterns</p>
        </div>


        <div className='border border-gray-600 rounded-lg m-1 p-5 bg-white dark:bg-[#1E293B] flex flex-col shadow-md  hover:scale-105 hover:shadow-xl'>
          <div className='flex flex-row justify-center gap-1'>
            <span className='text-[#4F46E5] text-2xl'><RiBarChartBoxFill/></span>
            <h1 className='text-[#111827] dark:text-[#F9FAFB] font-bold text-xl'>Understanding</h1>
          </div>
          <p className='text-center text-[#6B7280] dark:text-[#9CA3AF] font-semibold'>Visualize income vs expenses and category-wise spending</p>
        </div>

        <div className='border border-gray-600 rounded-lg m-1 p-5 bg-white dark:bg-[#1E293B] flex flex-col shadow-md  hover:scale-105 hover:shadow-xl'>
          <div className='flex flex-row justify-center gap-1'>
            <span className='text-[#4F46E5] text-2xl'><MdInsights/></span>
            <h1 className='text-[#111827] dark:text-[#F9FAFB] font-bold text-xl'>Insight</h1>
          </div>
          <p className='text-center text-[#6B7280] dark:text-[#9CA3AF] font-semibold'>Identify trends, spikes, and financial habits over time</p>
        </div>

        <div className='border border-gray-600 rounded-lg m-1 p-5 bg-white dark:bg-[#1E293B] flex flex-col shadow-md  hover:scale-105 hover:shadow-xl'>
          <div className='flex flex-row justify-center gap-1'>
            <span className='text-[#4F46E5] text-2xl'><TbTargetArrow/></span>
            <h1 className='text-[#111827] dark:text-[#F9FAFB] font-bold text-xl'>Control</h1>
          </div>
          <p className='text-center text-[#6B7280] dark:text-[#9CA3AF] font-semibold'>Make smarter financial decisions and avoid unnecessary expenses</p>
        </div>
      </section>

    </main>
  )
}

export default Home

/*
.

🧠 Section (Explain value clearly):
👁️ Awareness

Track every transaction and filter your spending patterns.

📊 Understanding

Visualize income vs expenses and category-wise spending.

📈 Insight

Identify trends, spikes, and financial habits over time.

🎯 Control

Make smarter financial decisions and avoid unnecessary expenses.
*/