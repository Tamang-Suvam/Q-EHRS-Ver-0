import React, { useState  } from "react";
import { ValidateQuery } from "../../../ValidateQuery";

export default function Doctors({contract}) {
  const [query, setQuery] = useState([])
  const [doctorArray, setDoctorArray] = useState([])

  const handleSubmit = async e => {
    e.preventDefault();
    const [select, from, where_1, where_2 ] = ValidateQuery(query)

    if(from === 'DOCTORS') {
      if(select === '*') {
        if(where_1 === 'DEPARTMENT') {
          let doctors = await contract.methods.getRegisteredDoctorsByDept(where_2).call()
          setDoctorArray(doctors)
        } else {
          let doctors = await contract.methods.getRegisteredDoctors().call()
          if(doctors.length === 0) {
            alert("No Doctors registered yet!")
          } else {
            setDoctorArray(doctors)
          }
        }
      }
    } else {
      alert("Invalid SQL Query!")
    }
  }
  return (
    <div>
        <p>&nbsp;</p>
          <form className="form-group form-control-lg" onSubmit={handleSubmit}>
              
              <h1 className='text-center fw-bolder'>View Registered Doctors</h1>
              <label className="fs-2 form-control-lg" htmlFor="exampleFormControlTextarea1">Enter the SQL query</label>
              <textarea className="form-control form-control-lg fs-2" id="FormControlTextarea1" rows="1"
                        value={query} onChange={event => {setQuery(event.target.value)}} required></textarea>

              <div className="d-grid gap-2">
                    <p>&nbsp;</p>
                    <button type="submit" className="btn btn-outline-info btn-lg btn-block fs-2">Enter</button>
              </div>

          </form>
        <p>&nbsp;</p>
        { doctorArray.length === 0 ? <h5 className='text-center text-danger'>No Doctors</h5> :
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col" className='fs-2 text-center'>S.No.</th>
                  <th scope="col" className='fs-2 text-center'>ID</th>
				          <th scope="col" className='fs-2 text-center'>Name</th>
                  <th scope="col" className='fs-2 text-center'>Department</th>
                </tr>
              </thead>
              {doctorArray.map((val, index) => {
                return (
                  <tbody>
                  <tr key={index}>
                    <td className='fs-2 text-center'>{index + 1}</td>
                    <td className='fs-2 text-center'>{val.id}</td>
					          <td className='fs-2 text-center'>{val.name}</td>
                    <td className='fs-2 text-center'>{val.department}</td>
                  </tr>
                  </tbody>
                )
              })}
            </table>
          }
    </div>
  );
}
