// import React , { useState } from 'react';

// export default function ClinicRegister({contract, account}) {
//     const [name, setName] = useState("");
//     // const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [register, setRegister] = useState(false);

//     const AddClinic = (e) => {
//         e.preventDefault();
//         if( !password ){
//             alert("Email or Password cannot be empty!")
//         } else {
//             contract.methods.addClinic(name, password).send({from: account})
//             contract.events.ClinicAdded(function(error, event){ 
//             if(event){
//               console.log(event.returnValues.clinicName)
//               setRegister(true)
//               return
//             }
//             if(error) {
//               alert("Clinic couldn't be added!")
//             }
//           }) 
//         }
//   }


//     return (
//         <div>
//             <h1 className='text-center fw-bolder'>Clinic Registration Portal</h1>
//             <form className="form-control form-control-lg" onSubmit={AddClinic}>
//                 {/* <div className="form-group">
//                     <label className="form-label fs-2">Enter Clinic Address</label>
//                     <input type="address" className="form-control fs-2" value={email} 
//                         onChange={event => setEmail(event.target.value)} required/>
//                 </div> */}
//                 <p>&nbsp;</p>
//                 <div className="form-group">
//                     <label className="form-label fs-2">Enter Clinic Name</label>
//                     <input type="address" className="form-control fs-2" value={name} 
//                         onChange={event => setName(event.target.value)} required/>
//                 </div>
//                 <p>&nbsp;</p>
//                 <div className="form-group">
//                     <label className="form-label fs-2">Password</label>
//                     <input type="password" className="form-control fs-2" value={password} 
//                            onChange={event => setPassword(event.target.value)} required />
//                 </div>
//                 <div className="d-grid gap-2">
//                   <p>&nbsp;</p>
//                   <button type="submit" className="btn btn-outline-primary btn-lg btn-block fs-2">Register</button>
//                 </div>
//             </form>
//             <p>&nbsp;</p>
//             { register ? (
//                             <p className="text-success text-center fs-3">Clinic Registered Successfully</p>
//                          ) : (
//                             <p className="text-danger text-center fs-3">Clinic Not Registered</p>
//                          )
//             }
//         </div>
//     )
// }

import React, { useState } from "react"
import {  useNavigate } from 'react-router-dom'
import inputImage from '../../../assets/loginPic.webp'

export default function ClinicRegister({contract, account}) {
  const [name, setName] = useState(" ")
  const [Address, setAddress] = useState(" ")
  const [password, setPassword] = useState(" ")
  const [register, setRegister] = useState(false)
  const navigate = useNavigate()

  const handleClick = e => {
    e.preventDefault()
    navigate("/clinic_login")
  }

  // The function below is for registration of the clinic into the system
  const AddClinic = (e) => {
      e.preventDefault();
      
      if( !password ){
          alert("Email or Password cannot be empty!")
      } else {
          contract.methods.addClinic(name, password).send({from: account})
          contract.events.ClinicAdded(function(error, event){ 
          
            if(event){
              setRegister(true)
              return
            }
            if(error) {
              alert("Clinic couldn't be added!")
            }
          }) 
      }
  }

  const myStyle={
    backgroundImage: `url(${inputImage})`,
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    backgroundSize: 'cover',
  }

  return (
    <>
      <div style={myStyle}>
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title fs-2">Sign Up</h3>
              <div className="text-center fs-2">
                Already registered?{" "}
                <span className="link-primary" onClick={handleClick}>
                  Sign In
                </span>
              </div>
              <div className="form-group mt-3 fs-2">
                <label>Clinic Name</label>
                <input
                  type="text"
                  className="form-control mt-1 fs-2"
                  placeholder="Clinic Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group mt-3 fs-2">
                <label>Clinic address</label>
                <input
                  type="address"
                  className="form-control mt-1 fs-2"
                  placeholder="e.g 0x53D411001529BcEC9fcce19D37B0704A51854F38"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="form-group mt-3 fs-2">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1 fs-2"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-grid gap-2 mt-3 fs-2">
                <button type="submit" className="btn btn-outline-primary fs-2"
                        onClick={AddClinic}>
                  Submit
                </button>
              </div>
              <p className="text-center mt-2 fs-2">
                Forgot <a href="#">password?</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}