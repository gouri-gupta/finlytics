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
      const response=await axios.post(`http://localhost:3100/api/auth/login`,obj)
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
    <main>
      <h1>Login page</h1>

      <form onSubmit={handleLogin}>
        <label htmlFor="">Email</label>
        <input type="text" name='currEmail' value={currEmail} onChange={handleChange} placeholder='Enter email'/> <br />
        {errors.email && <span>{errors.email}</span>} <br />
        <label htmlFor="">Password</label>
        <input type="password" name='currPass' value={currPass} onChange={handleChange} placeholder='Enter password'/> <br />
        {errors.pass && <span>{errors.pass}</span>} <br />
        <button type='submit'>Login</button>
      </form>

      <h3>Don't have an account?  </h3>
      <Link to="/register">Register</Link>
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


