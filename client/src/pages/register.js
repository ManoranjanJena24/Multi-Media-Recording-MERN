import React, { useState } from 'react';
import './Register.css'; // Import the external CSS file
import { Link } from 'react-router-dom';

function Register() {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

    async function registerUser(event) {
        event.preventDefault();

        const response = await fetch('http://localhost:3001/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });

        const data = await response.json();
        console.log(data);
        if (data.status === 'ok') {
            window.location.href = '/login';
        } else {
            alert(data.error);
        }
    }

    return (
        <div className="container">
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                <input
                    className="input-field"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Name"
                />
                <br />
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
                <input className="submit-button" type="submit" value="Register" />
                <br />
                <p>Already have an account? <Link to="/login">Login instead</Link>.</p>
            </form>
        </div>
    );
}

export default Register;
