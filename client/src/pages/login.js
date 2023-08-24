import { useState } from 'react'
import './Login.css';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function loginUser(event) {   
    event.preventDefault()

    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await response.json()

    if (data.user) {
      alert('Login successful')
      localStorage.setItem('token', data.user)
      //after successful login, change the route
      window.location.href = '/dashboard'
    } else {
      alert('Invalid username or password')

    }
    console.log(data)
  }


  return <div className="container">
    <h1>Login</h1>
    <form onSubmit={loginUser}>

      <input
        className="input-field"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
      />
      <br />
      <input
        className="input-field"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <br />
      <input className="submit-button" type="submit" value="Login" />
      <br />
        <p><Link to="/register">Create new account?</Link></p>
    </form>
  </div>
}

export default Login;
