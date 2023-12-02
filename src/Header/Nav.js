import React, { useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import logo from "./../assets/logo.png"
const Header = () => {
    const auth = localStorage.getItem("user");  
    const navigate = useNavigate()
    const logout = () =>{
        localStorage.clear();
        navigate("/register")
    }
    return (
    <div className='header'>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/"><img src={logo}/></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {
                                auth ? 
                                <>
                                    <li className="nav-item mr-3"><Link className="nav-link active" to="/">Home</Link></li>
                                    <li className="nav-item me-3"><Link className="nav-link" to="/add">Add Products</Link></li>
                                    <li className="nav-item me-3"><Link className="nav-link fw-bold" >{JSON.parse(auth).name}</Link></li>
                                    <li className="nav-item me-3"><Link className="btn btn-danger" to="/register" onClick={logout}>Logout</Link></li>
                                </> :
                                <>
                                    <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/register">Register</Link> </li>
                                </>
                            }
                        
                    </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Header