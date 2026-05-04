import {useState,useContext} from 'react'
import axios from 'axios'
import { Link ,useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import { userContext } from '../context/AuthContext'

const Login = () => {

  let navigate=useNavigate()

  const {isLogin,logoutUser,loginUser}=useContext(userContext)

  let [currentUser,setCurrUser]=useState({
    currEmail:"",
    currPass:""
  })

  let [errors,setErrors]=useState({})

  let {currEmail,currPass}=currentUser

  async function sendData(obj){
    try {
      const response=await axios.post(`https://finlytics-backend-t4r0.onrender.com/api/auth/login`,obj)
      //console.log(response)
      let {data}=response
      //console.log(data)
      //we will get a token -> store in localstorage
      localStorage.setItem("token",data.token)  //we will use it in authorization headers whenever we want to get trnasactions
      //we will also get _id,name and email of the user
      //we will store name and email in userContext so that it can be reused in profile page
      let newObj={name:data.user.name,email:data.user.email}
      //save user info in localstorage also
      localStorage.setItem("user",JSON.stringify(newObj)) //convert object to string
      //localStorage can store string values only.
//To store an object, you need to convert it to a JSON string using JSON.stringify() and then retrieve it with JSON.parse()
      loginUser(newObj)
      toast.success("Logged in successfully")
      navigate("/dashboard")
    } 
    catch (error) {
        console.log(error)
        console.log(error.message)
        toast.error("Invalid Login credentials")
    }
  }

  let handleChange = (e) => {
        let { name, value } = e.target
        setCurrUser({ ...currentUser, [name]: value })
        //Even though the input type="tel" looks like a number, HTML inputs always return a string in e.target.value
  }

  let handleLogin=(e)=>{
    e.preventDefault()

    let validationError={} //we will generate error only when the user enters invalid data

    //check whether email and password are enter MEANS they shouldnt be empty
    //also email should be a proper email

    //validating email
    let regexEmail=/\S+@\S+\.\S+/
    //regex.test(string) 
    if(currEmail==""){
      validationError.email="*This field is mandatory"
    }
    else if(!regexEmail.test(currEmail)){
      validationError.email="This should be an email"
    }

    //validating password
    if(currPass==""){
      validationError.pass="*This field is mandatory"
    }

    setErrors(validationError)

    if(Object.keys(validationError).length === 0){
      //means no errors detected then only call API
    //if email and password is enetered correctly then we will use POST API
      let newObj={email:currEmail,password:currPass}
      sendData(newObj)
    }
  }
  

  return (
    <main className=' flex flex-col gap-y-10 '>  {/**border border-black */}
      <section className=' '> {/**border border-red-800 */}
        <h1 className='font-bold text-4xl  text-[#111827] dark:text-[#F9FAFB] text-center'>Welcome back</h1>
      </section>

      <section className=' flex flex-row justify-center'> {/**border border-green-800 */}
        <form onSubmit={handleLogin} className=' flex flex-col gap-5'> {/**border border-black */}
          <div className=' flex flex-col gap-1 w-full'> {/**border border-rose-700*/}
            <div className=' flex flex-row gap-1 w-full'>
              <label htmlFor="" className='text-xl text-[#6B7280] dark:text-[#9CA3AF] font-bold p-1 w-1/3'>Email</label>
              <input type="text" name='currEmail' value={currEmail} onChange={handleChange} placeholder='Enter email' className='bg-[#F3F4F6] w-2/3 border border-gray-700 text-[#111827] p-1 rounded-lg dark:bg-[#1E293B] dark:border-[#4F46E5] dark:text-[#F9FAFB]'/> 
            </div>
            {errors.email && <span className='text-red-800 font-semibold block'>{errors.email}</span>}
          </div>


          <div className=' flex flex-col gap-1 w-full'> {/** border border-yellow-700*/}
            <div className=' flex flex-row gap-1 w-full'>
              <label htmlFor="" className='text-xl text-[#6B7280] dark:text-[#9CA3AF] font-bold p-1 w-1/3'>Password</label>
              <input type="password" name='currPass' value={currPass} onChange={handleChange} placeholder='Enter password' className='bg-[#F3F4F6] w-2/3 border border-gray-700 text-[#111827] p-1 rounded-lg dark:bg-[#1E293B] dark:border-[#4F46E5] dark:text-[#F9FAFB]'/>  
            </div> 
            {errors.pass && <span className='text-red-800 font-semibold'>{errors.pass}</span>}
          </div>
          
          <div className=' flex justify-center' > {/**border border-red-800 */}
            <button type='submit' className='bg-indigo-500 border-2 border-indigo-950  text-xl text-white font-bold px-2 py-1 rounded-lg hover:bg-indigo-900'>Login</button>
          </div>
        </form>
      </section>
 
      <section className=' flex flex-row lg:gap-1 justify-center'> {/**border border-orange-800 */}
        <h3 className='text-gray-800 text-xl dark:text-gray-200 font-bold'>Don't have an account?  </h3>
        <Link to="/register" className='text-indigo-900 font-bold text-xl'>Register</Link>
      </section>
    </main>
  )
}

export default Login

/*
For login we can either use onClick event inside Login button OR onSubmit event inside form tag

WHY onSubmit IS BETTER

Because a form is meant to be submitted, not just clicked.

✅ Benefits of onSubmit:
Works with Enter key
User presses Enter → form submits ✔
(onClick WON’T handle this ❌)
Semantic HTML (important)
Browser understands it's a form
Better accessibility + standards
Cleaner logic
All form handling in one place
Industry standard
Every real app uses this
 */


