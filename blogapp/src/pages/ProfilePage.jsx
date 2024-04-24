import React from 'react'
import account from '../assets/account.png'

const ProfilePage = () => {
  return (
    <div className='ProfilePageDiv'>
      <img src={account} className="profileImage" alt="Account" />
      <div className="infoStatsDescription">
        <div className="info">
          <div>yaoyu</div>
          <button>Follow</button>
          <button>Message</button>
        </div>
        <div className="stats">
          <div>0 posts</div>
          <div>0 followers</div>
          <div>0 following</div>
        </div>
        <div className='description'>
          Descriptiosdfasdfwefjirwbgowudavnldfijaiodfuhwaeugfwubfiewubgewioyb equhqeiufhiudfiuad f vp eqebf n
        </div>
        <h1>Blog</h1>
      </div>
    </div>
  )
}

export default ProfilePage