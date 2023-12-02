import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const loginHandle = async()=>{
        let result = await fetch("http://localhost:5000/login", {
            method: "post",
            body: JSON.stringify({email,password}),
            headers:{
                "Content-Type": "application/json"
            }
        })
        result = await result.json() 
        console.log(result)
        if(result.auth){
            localStorage.setItem("user", JSON.stringify(result.user))
            localStorage.setItem("token", JSON.stringify(result.auth))
            navigate("/")
        }else{
            alert("User data not found")
        }
    }
    return (
        <div className='login d-flex h-100 align-items-center justify-content-center bg-login-bg-banner'>
            <form className='p-5 flex flex-col login-box border mt-5'>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder='Enter your Email Address' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder='Enter your Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type="button" className="btn btn-primary" onClick={loginHandle}>Submit</button>
            </form>
        </div>
    )
}

export default Login