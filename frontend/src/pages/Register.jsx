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
      const response=await axios.post(`http://localhost:3100/api/auth/register`,obj)
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
    <main>
      <h1>Register on Finlytics</h1>
      <h3>Enter the following details to create account</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="">Name</label>
        <input type="text" placeholder='Enter name' name='name' value={name} onChange={handleChange}/> <br />
        {errors.name && <span>{errors.name}</span>} <br />
        <label htmlFor="">Email</label>
        <input type="text" placeholder='Enter email' name='email' value={email} onChange={handleChange}/> <br />
        {errors.email && <span>{errors.email}</span>} <br />
        <label htmlFor="">Password</label>
        <input type="password" placeholder='Enter password' name='password' value={password} onChange={handleChange}/> <br />
        {errors.password && <span>{errors.password}</span>} <br />
        <button type='submit'>Register</button>
      </form>
    </main>
  )
}

export default Register