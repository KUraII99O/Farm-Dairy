import React from 'react'
import SettingHeader from '../../component/SettingHeader'
import SignUpForm from '../../component/ProfileISettings'

const ProfileSettingPage = () => {
  return (
    <div className="mx-4 my-4 flex flex-col items-center pt-5"> {/* Flex container */}
    <div className="w-full"> {/* Adjust margin based on your layout */}
        <SettingHeader />
        <SignUpForm />
      </div>
    </div>
  )
}

export default ProfileSettingPage