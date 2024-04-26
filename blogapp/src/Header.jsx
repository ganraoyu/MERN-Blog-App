import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'
import account from './assets/account.png';
const Header = () => {
  const {setUserInfo, userInfo} = useContext(UserContext);
  
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include'
    }).then(response => {
      if (response.ok) {
        response.json().then(userInfo => {
          setUserInfo(userInfo)
        })
      } else {
        setUserInfo(null)
      }
    })
  }, [])

  function logout(){
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST'
    }).then(() => {
      setUserInfo(null)
    })
  }

  const username = userInfo?.username

  return (
    <header>
    <Link to="/" className="logo">BlogifyHub</Link>
    <nav>
      {username && (
        <>
        <Link to="/create">Create New Post</Link>
        <a className="logout" onClick={logout}>Logout</a>
        <Link to={`/profile/${userInfo.id}`}><img src={account} alt='Account' className='ProfileImage'/></Link>
        </>
      )}
      {!username && (
        <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/profile"><img src={account} alt='Account' className='ProfileImage'/></Link>
        </>
      )}
    </nav>
  </header>
  )
}

export default Header