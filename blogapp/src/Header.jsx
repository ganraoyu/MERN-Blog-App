import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'

const Header = () => {
  const [username, setUsername] = useState('')
  
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include'
    }).then(response => {
      response.json().then(userInfo => {
        setUsername(userInfo.username)
      })
    })
  }, [])

  function logout(){
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST'
    })
    setUsername(null)
  }

  return (
    <header>
    <Link to="/" className="logo">Myblog</Link>
    <nav>
      {username && (
        <>
        <Link to="create">Create New Post</Link>
        <a className="logout" onClick={logout}>Logout</a>
        </>
      )}
      {!username && (
        <>
        <Link to="login">Login</Link>
        <Link to="register">Register</Link>
        </>
      )}
    </nav>
  </header>
  )
}

export default Header
