import React from 'react';
import DoctorRegister from './DoctorRegister';
import NavbarClinic from './NavbarClinic';
import ViewDoctors from './ViewDoctors';
import ViewPatients from './ViewPatients';

export const Clinic = ({clinic_contract, doctor_contract, patient_contract, account}) => {
  return (
    <div>
        <NavbarClinic account = {account}/>
        <DoctorRegister contract = {clinic_contract} account = {account}/>
        <ViewDoctors contract = {doctor_contract}/>
        <ViewPatients contract = {patient_contract}/>
    </div>
  )
}

export default Clinic;