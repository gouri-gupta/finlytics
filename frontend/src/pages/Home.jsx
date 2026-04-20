import {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { TbTargetArrow } from "react-icons/tb"
import { MdInsights } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { RiBarChartBoxFill } from "react-icons/ri";
import { FaArrowDown,FaArrowLeft,FaArrowRight,FaArrowUp } from "react-icons/fa";

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
    <main>
      
      <div>  {/**tagline */}
        <h1>Where does your money actually go?</h1>
      </div>
      {/**Add logo also here in big */}

      <div> {/**small descripiton */}
        <h3>Most people earn and spend — but never truly understand their finances.</h3>
        <h3>Finlytics turns your transactions into clear insights so you can make smarter decisions.</h3>
      </div>

      {
        !isLogin && 
      <div>
        <button onClick={getStarted}>Start Tracking Your Finances</button>
      </div>
      }

      {/**Purpose of this project */}
      <section>
        <div>
          <h1><span><FaRegEye/></span>Awareness</h1>
          <p>Track every transaction and filter your spending patterns</p>
        </div>
        <div>
          <h1><span><RiBarChartBoxFill/></span>Understanding</h1>
          <p>Visualize income vs expenses and category-wise spending</p>
        </div>
        <div>
          <h1><span><MdInsights/></span>Insight</h1>
          <p>Identify trends, spikes, and financial habits over time</p>
        </div>
        <div>
          <h1> <span><TbTargetArrow/></span>Control</h1>
          <p>Make smarter financial decisions and avoid unnecessary expenses</p>
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