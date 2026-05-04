import {useState} from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  let navigate=useNavigate()

  let [currUser,setUser]=useState({
    name:"",
    email:"",
    password:""
  })

  let {name,email,password}=currUser

  let [errors,setErrors]=useState({})

  async function sendData(obj) {
    //this obj contains user details now we need to send this data to backend
    try {
      const response=await axios.post(`https://finlytics-backend-t4r0.onrender.com/api/auth/register`,obj)
      let {data}=response
      //console.log(data)
      if(data.success){
        //means user account is created successfully
        toast.success("Account created! Please login to continue")
        navigate("/login")
      }
    } 
    catch (error) {
      console.log(error)
      //console.log(error.message)
      toast.error(error.response?.data?.message)
    }
  }

  let handleChange = (e) => {
        let { name, value } = e.target
        setUser({ ...currUser, [name]: value })
        //Even though the input type="tel" looks like a number, HTML inputs always return a string in e.target.value
  }

  let handleSubmit=(e)=>{
    e.preventDefault()

    let validationErrors={}

    //checking name
    if(name.trim()===""){
      validationErrors.name="*This field is mandatory"
    }

    //checking email
    let regexEmail=/\S+@\S+\.\S+/
    //regex.test(string) 
    if(email.trim()===""){
      validationErrors.email="*This field is mandatory"
    }
    else if(!regexEmail.test(email.trim())){
      validationErrors.email="This should be an email"
    }

    //validating password
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if(password.trim()===""){
      validationErrors.password="*This field is mandatory"
    }
    else if(password.length<8){
      validationErrors.password="Password should be at least 8 characters"
    }
    else if(!passwordRegex.test(password.trim())){
      validationErrors.password="Password must be at least 8 characters and include letters and numbers"
    }

    setErrors(validationErrors)

    if(Object.keys(validationErrors).length === 0){
      //means no errors detected then only call API
    //if name,email and password is enetered correctly then we will use POST API
      let newObj={name,email,password}
      sendData(newObj)  //here in this function we will do POST API call etc
    }
  }


  return (
    <main className='flex flex-col gap-y-10 '>

      <section className='flex flex-col gap-3'>
        <h1 className='font-bold text-4xl  text-[#111827] dark:text-[#F9FAFB] text-center'>Register on Finlytics</h1>
        <h3 className='text-center text-xl italic text-gray-800  dark:text-gray-200'>Enter the following details to create account</h3>
      </section>

      <section className=' flex flex-row justify-center'>
        <form onSubmit={handleSubmit} className=' flex flex-col gap-5'>

          <div className=' flex flex-col gap-1 w-full'>
            <div className=' flex flex-row gap-1 w-full'>
              <label htmlFor="" className='text-xl text-[#6B7280] dark:text-[#9CA3AF] font-bold p-1 w-1/3'>Name</label>
              <input type="text" placeholder='Enter name' name='name' value={name} onChange={handleChange} className='bg-[#F3F4F6] w-2/3 border border-gray-700 text-[#111827] p-1 rounded-lg dark:bg-[#1E293B] dark:border-[#4F46E5] dark:text-[#F9FAFB]'/>  
            </div> 
            {errors.name && <span className='text-red-800 font-semibold block'>{errors.name}</span>}
          </div>

          <div className=' flex flex-col gap-1 w-full'>
            <div className=' flex flex-row gap-1 w-full'>
              <label htmlFor="" className='text-xl text-[#6B7280] dark:text-[#9CA3AF] font-bold p-1 w-1/3'>Email</label>
              <input type="text" placeholder='Enter email' name='email' value={email} onChange={handleChange} className='bg-[#F3F4F6] w-2/3 border border-gray-700 text-[#111827] p-1 rounded-lg dark:bg-[#1E293B] dark:border-[#4F46E5] dark:text-[#F9FAFB]'/> 
            </div>
            {errors.email && <span className='text-red-800 font-semibold block'>{errors.email}</span>} 
          </div>

          <div className=' flex flex-col gap-1 w-full'>
            <div className=' flex flex-row gap-1 w-full'>
              <label htmlFor="" className='text-xl text-[#6B7280] dark:text-[#9CA3AF] font-bold p-1 w-1/3'>Password</label>
              <input type="password" placeholder='Enter password' name='password' value={password} onChange={handleChange} className='bg-[#F3F4F6] w-2/3 border border-gray-700 text-[#111827] p-1 rounded-lg dark:bg-[#1E293B] dark:border-[#4F46E5] dark:text-[#F9FAFB]'/> 
            </div>
            {errors.password && <span className='text-red-800 font-semibold block'>{errors.password}</span>}
          </div>

          <div className=' flex justify-center'>
            <button type='submit' className='bg-indigo-500 border-2 border-indigo-950  text-xl text-white font-bold px-2 py-1 rounded-lg hover:bg-indigo-900'>Register</button>
          </div>
      </form>
      </section>
    </main>
  )
}

export default Register