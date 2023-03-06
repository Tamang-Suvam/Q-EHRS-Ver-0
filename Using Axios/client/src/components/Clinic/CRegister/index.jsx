import React from 'react';
import ClinicRegister from './ClinicRegister';

export const CRegister = ({contract, account}) => {
  return (
    <div>
        <ClinicRegister contract = {contract} account = {account}/>
    </div>
  )
}

export default CRegister;
