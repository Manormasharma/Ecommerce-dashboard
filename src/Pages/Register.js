import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const navigate = useNavigate()
    const collectData = async() =>{
        console.warn(email,password,name)
        const result = await fetch('http://localhost:5000/register',{
            method: 'post',
            body: JSON.stringify({ name,email, password }),
            headers : {
                "Content-Type": "application/json"
            } 
        })
        const resultdata = await result.json()
        localStorage.setItem("user", JSON.stringify(resultdata.result))
        localStorage.setItem("token", JSON.stringify(resultdata.auth))
        navigate("/")
    }
    const auth = localStorage.getItem("user")
    useEffect(()=>{
        if(auth){
            navigate("/")
        }
    })
  return (
    <div className='d-flex h-100 align-items-center justify-content-center bg-login-bg-banner'>
        <form className='p-5 flex flex-col register-box border mt-5'>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" id="name" placeholder='Enter your Name' value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder='Enter your Email Address' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" id="password" placeholder='Enter your Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button type='button' onClick={collectData} className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Register