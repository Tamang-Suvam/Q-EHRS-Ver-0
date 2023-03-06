import React, {useState} from 'react';

export const RegisterFun = ({contract, account}) => {
    const [doctorAddress, setDoctorAddress] = useState('')
    const [doctorName, setDoctorName] = useState('')
    const [clinicName, setClinicName] = useState('')
    const [doctorDepartment, setDoctorDepartment] = useState('')
    const [password, setPassword] = useState('')
    const [register, setRegister] = useState(false)

    const AddDoctor = event => {
        event.preventDefault();
        if( !doctorAddress || !doctorName || !doctorDepartment|| !password ){
          alert("Doctor ID or Name or Department or Password cannot be empty!")
        } 
        else {
            contract.methods.clinicAddDoctor(doctorAddress, doctorName, clinicName, doctorDepartment.toUpperCase(), password).send({from: account})
            console.log(doctorAddress +' '+ password)
            contract.events.DoctorAdded(function(error, event){ 
            if(event){
              setRegister(true)
              return
            }
            if(error) {
              alert("Doctor couldn't be added!")
            }
          }) 
        }
    }

    return (
        <div>
            <h1 className='text-center fw-bolder'>Doctor Registration Portal</h1>
            <form className="form-control form-control-lg" onSubmit={AddDoctor}>
                <div className="form-group">
                    <label className="form-label fs-2">Enter Doctor's ID</label>
                    <input type="address" className="form-control fs-2" value={doctorAddress} 
                        onChange={event => setDoctorAddress(event.target.value)} required/>
                </div>
                <p>&nbsp;</p>
                <div className="form-group">
                    <label className="form-label fs-2">Enter Doctors's Name</label>
                    <input type="text" className="form-control fs-2" value={doctorName} 
                        onChange={event => setDoctorName(event.target.value)} required/>
                </div>
                <p>&nbsp;</p>
                <div className="form-group">
                    <label className="form-label fs-2">Enter Clinic Name</label>
                    <input type="text" className="form-control fs-2" value={clinicName} 
                        onChange={event => setClinicName(event.target.value)} required/>
                </div>
                <p>&nbsp;</p>
                <div className="form-group">
                    <label className="form-label fs-2">Enter Doctors's Department</label>
                    <input type="text" className="form-control fs-2" value={doctorDepartment} 
                        onChange={event => setDoctorDepartment(event.target.value)} required/>
                </div>
                <p>&nbsp;</p>
                <div className="form-group">
                    <label className="form-label fs-2">Password</label>
                    <input type="password" className="form-control fs-2" value={password} 
                           onChange={event => setPassword(event.target.value)} required />
                </div>
                <div className="d-grid gap-2">
                  <p>&nbsp;</p>
                  <button type="submit" className="btn btn-outline-primary btn-lg btn-block fs-2">Register</button>
                </div>
            </form>
            <p>&nbsp;</p>
            { register ? (
                            <p className="text-success text-center fs-6">Doctor Registered Successfully</p>
                         ) : (
                            <p className="text-danger text-center fs-6">Doctor Not Registered</p>
                         )
            }
        </div>
    )
}

export default RegisterFun