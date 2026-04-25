import { useContext, useEffect, useState } from 'react'
import { userContext } from '../context/AuthContext'

const Profile = () => {
  const { user } = useContext(userContext)

  const [avatar, setAvatar] = useState("")

  useEffect(() => {
    if (user?.name) {
      setAvatar(user.name[0].toUpperCase())
    }
  }, [user])

  return (
    <main className="w-full flex justify-center items-start sm:items-center min-h-[calc(100vh-80px)] px-3 py-6">

      <div className="w-full max-w-md sm:max-w-2xl bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155] rounded-2xl shadow-md p-5 sm:p-8 flex flex-col gap-6">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-xl sm:text-3xl font-bold text-[#111827] dark:text-[#F9FAFB]">
            User Profile
          </h1>
          <p className="text-xs sm:text-base text-[#6B7280] dark:text-[#9CA3AF] mt-1">
            Manage your account details
          </p>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center sm:flex-row sm:items-center gap-5 sm:gap-6">

          {/* Avatar */}
          <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-[#4F46E5] flex items-center justify-center text-white text-2xl sm:text-4xl font-bold shadow-md shrink-0">
            {avatar}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4 text-center sm:text-left w-full">

            <div>
              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                Name
              </p>
              <h2 className="text-base sm:text-xl font-semibold text-[#111827] dark:text-[#F9FAFB] break-words">
                {user.name}
              </h2>
            </div>

            <div>
              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                Email
              </p>
              <h2 className="text-base sm:text-xl font-semibold text-[#111827] dark:text-[#F9FAFB] break-words">
                {user.email}
              </h2>
            </div>

          </div>
        </div>

      </div>
    </main>
  )
}

export default Profile