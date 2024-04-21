import React from 'react'
import account from '../assets/account.png'

const ProfilePage = () => {
  return (
    <div className= 'ProfilePageDiv'>
      <img src={account} className="profileImage"alt="Account" />
      <div>
        <div>UserName</div>
        <div>Follow</div>
        <div>Message</div>
      </div>
      <div>
        <div>0 Posts</div>
        <div>0 followers</div>
        <div>0 following</div>
      </div>
      <div>Description</div>
    </div>
  )
}

export default ProfilePage