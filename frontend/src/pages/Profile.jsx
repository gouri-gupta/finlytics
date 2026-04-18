import {useContext} from 'react'
import { userContext } from '../context/AuthContext'

const Profile = () => {

  const {user}=useContext(userContext)

  return (
    <main>
      <h1>User profile</h1>
      <h2>Name : {user.name}</h2>
      <h2>Email : {user.email}</h2>
    </main>
  )
}

export default Profile