import {useContext} from 'react'
import { useNavigate } from 'react-router-dom'

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
        <h1>Your personal finance dashboard for smarter decisions.</h1>
      </div>
      {/**Add logo also here in big */}

      <div> {/**small descripiton */}
        <h3>Track your income, monitor expenses, and gain insights into your financial habits — all in one place.</h3>
      </div>

      {
        !isLogin && 
      <div>
        <button onClick={getStarted}>Get started</button>
      </div>
      }
    </main>
  )
}

export default Home