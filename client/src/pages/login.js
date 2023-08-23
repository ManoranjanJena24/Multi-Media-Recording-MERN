import { useState } from 'react'

function App() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  async function loginUser(event) {  //this is the first time when our FE will connect with the BE 
    event.preventDefault()

    const response = await fetch('http://localhost:3001/api/login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        email,
        password,
      }),
    })

    const data= await response.json()

	// if(data.user){
	// 	alert('Login successful')
	// 	//after successful login, change the route
	// 	window.location.href='/dashboard'
	// } else {
	// 	alert('Invalid username or password')

	// }
  console.log(data)
  }

  
  return <div>
    <h1>Login</h1>
    <form onSubmit={loginUser}>
     
      <input 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        type="email"
        placeholder="Email"
      />
      <br />
      <input 
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <br />
      <input type="submit" value="Login"/>
    </form>
  </div>
}

export default App;
