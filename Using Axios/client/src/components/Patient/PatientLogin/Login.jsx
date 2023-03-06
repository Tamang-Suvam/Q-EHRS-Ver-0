import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = ({contract}) => {
    // const [email, setPatientEmail] = useState('')
    const [password, setPassword] = useState('')
    const [login, setLogin] = useState(false);
    const navigate = useNavigate();
    
    const onSubmit = (e) =>{
      e.preventDefault()
      if( !password ){
        alert("Email or Password cannot be left empty!")
      } else {
        contract.methods.checkPatient(password).call().then( x => {
          if(x){
            setLogin(true)
            navigate("/patient_page")
          } else{
            alert("Failed to log in!!")
            return
          }
        });
      }
    }
  
    return (
      <div>
        <p>&nbsp;</p>
        <h1 className='text-center fs-2'>Patient Login Page</h1>
        <p>&nbsp;</p>
        <form className="form-control form-control-lg" onSubmit={onSubmit}>
          {/* <div className="mb-3">
              <label className="form-label fs-2">Enter your address</label>
              <input type="address" className="form-control fs-2" value={email} 
                  onChange={event => setPatientEmail(event.target.value)} required/>
          </div> */}
          <div className="form-group">
            <label className='fs-2'>Password</label>
            <input type="password" className="form-control fs-2" value={password} 
                   onChange={event => setPassword(event.target.value)} required/>
          </div>
          <div className="d-grid gap-2">
            <p>&nbsp;</p>
            <button type="submit" className="btn btn-outline-primary btn-lg btn-block fs-2">Log In</button>
          </div>
        </form>
        {login ? (
            <p className="text-success text-center">You Are Logged in Successfully</p>
          ) : (
            <p className="text-danger text-center">You Are Not Logged in</p>
          )}
      </div>
    )
}

export default Login;
