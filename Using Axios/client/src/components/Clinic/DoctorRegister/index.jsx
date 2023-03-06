import React from 'react'
import RegisterFun from './RegisterFun'

export const DoctorRegister = ({contract, account}) => {
  return (
    <div>
        <RegisterFun contract = {contract} account = {account}/>
    </div>
  )
}

export default DoctorRegister;