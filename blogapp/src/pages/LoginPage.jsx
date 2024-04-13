import React, { useState } from 'react';

const LoginPage = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function login(event){
    event.preventDefault()
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      body:JSON.stringify({username, password}),
      headers: {
        'Content-Type': 'application/json'}
    })
    console.log('login success')
  }
  return (
    <form className='login' onSubmit={login}>
        <h1>Login</h1>
        <input type="text" 
          placeholder='username' 
          value={username} 
          onChange={event => setUsername(event.target.value)}/>
        <input type="password" 
          placeholder='password'
          value={password} 
          onChange={event => setPassword(event.target.value)}/>
        <button>Login</button>
    </form>
  )
}

export default LoginPage;