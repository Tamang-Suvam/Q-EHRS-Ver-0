import React from 'react';
import Login from './Login';

export const PatientLogin = ({contract}) => {
  return (
    <div>
        <Login contract = {contract}/>
    </div>
  )
}

export default PatientLogin;
