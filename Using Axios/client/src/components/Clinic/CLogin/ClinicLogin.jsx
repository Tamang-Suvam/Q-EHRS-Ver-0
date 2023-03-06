// import React, { useState } from 'react';
// import {  useNavigate } from 'react-router-dom';

// export const ClinicLogin = ({contract}) => {
//     // const [address, setClinicAddress] = useState('')
//     const [password, setPassword] = useState('')
//     const [login, setLogin] = useState(false);
//     const navigate = useNavigate();

//     const onSubmit = (e) =>{
//       e.preventDefault()
//       if( !password ){
//         alert("Clinic ID or Password cannot be left empty!")
//       } else {
//         // contract.methods.checkClinic(address, password).call().then( x => {
//           contract.methods.checkClinic(password).call().then( x => {
//           if(x){
//             setLogin(true)
//             navigate("/clinic_page")
//           } else{
//             alert("Failed to log in!!")
//           }
//         });
//       }
//     }
  
//     return (
//       <div>
//         <p>&nbsp;</p>
//         <h1 className='text-center fs-2'>Clinic Login Page</h1>
//         <p>&nbsp;</p>
//         <form className="form-control form-control-lg" onSubmit={onSubmit}>
//           {/* <div className="mb-3">
//               <label className="form-label fs-2">Enter your address</label>
//               <input type="address" className="form-control fs-2" value={address} 
//                   onChange={event => setClinicAddress(event.target.value)} required/>
//           </div> */}
//           <div className="form-group">
//             <label className='fs-2'>Password</label>
//             <input type="password" className="form-control fs-2" value={password} 
//                    onChange={event => setPassword(event.target.value)} required/>
//           </div>
//           <div className="d-grid gap-2">
//             <p>&nbsp;</p>
//             <button type="submit" className="btn btn-outline-primary btn-lg btn-block fs-2">Log In</button>
//           </div>
//         </form>
//         {login ? (
//             <p className="text-success text-center fs-3">Logged in Successfully</p>
//           ) : (
//             <p className="text-danger text-center fs-3">Log in Failed</p>
//           )}
//       </div>
//     )
// }

// export default ClinicLogin;

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import image from '../../../assets/loginPic.webp'
import '../../../App.css'

export default function ClinicLogin({contract}) {

  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  const myStyle={
    backgroundImage: `url(${image})`,
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    backgroundSize: 'cover',
  }

  const handleClick = e  => {
    e.preventDefault()
    navigate("/clinic_registration")
  }

  const ClinicLogin = (e) =>{
    e.preventDefault()

    if( !password ){
      alert("Clinic ID or Password cannot be left empty!")
    } else {
        // contract.methods.checkClinic(address, password).call().then( x => {
        contract.methods.checkClinic(password).call().then( x => {
        if(x){
          setLogin(true)
          navigate("/clinic_page")
        } else{
          alert("Failed to log in!!")
        }
      });
    }
  }

  return (
    <>
    <div style={myStyle}>
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title fs-2">Sign In</h3>
          <div className="text-center fs-2">
            Not registered yet?{" "}
            <span className="link-primary" onClick={handleClick}>
              Sign Up
            </span>
          </div>
          <div className="form-group mt-3 fs-2">
            <label>Clinic address</label>
            <input
              type="address"
              className="form-control mt-1 fs-2"
              placeholder="Enter address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-group mt-3 fs-2">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1 fs-2"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-outline-primary fs-2"
                    onClick={ClinicLogin}>
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2 fs-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
   </div>
   </>
  )
}