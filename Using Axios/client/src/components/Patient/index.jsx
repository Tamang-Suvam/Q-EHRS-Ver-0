import React from 'react';
// import NavbarPatient from './NavbarPatient';
import PatientViewDoctors from './PatientViewDoctors';
import PatientViewRecords from './PatientViewRecords';

export const Patient = ({contract, account}) => {
  return (
    <div>
        {/* <NavbarPatient /> */}
        <PatientViewDoctors contract={contract}/>
        <PatientViewRecords contract={contract}/>
    </div>
  )
}

export default Patient;