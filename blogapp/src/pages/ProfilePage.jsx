import React from 'react'
import account from '../assets/account.png'

const ProfilePage = () => {
  return (
    <>
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
        </div>
      </div>

      <div className='blogPosts'>
        <h1 className='h1blog'>Blog</h1>
        <hr/>
        <div>
          <img src={account} className="profileImage" alt="Account" />
          <div>Blog Title</div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage