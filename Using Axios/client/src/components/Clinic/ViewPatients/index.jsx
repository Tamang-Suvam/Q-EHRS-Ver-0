import React from 'react';
import Patients from './Patients';

export const ViewPatients = ({contract}) => {
  return (
    <div>
        <Patients contract = {contract}/>
    </div>
  )
}

export default ViewPatients;