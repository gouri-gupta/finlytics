import React from 'react'
import { use } from 'react'
import { useNavigate } from 'react-router-dom'

/*
Tagline (big text)    Logo (somewhat bigger)
Small description (1 line)
CTA button:“Get Started” / “Login”
*/

const Home = () => {

  let navigate=useNavigate()

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

      <div>
        <button onClick={getStarted}>Get started</button>
      </div>
    </main>
  )
}

export default Home