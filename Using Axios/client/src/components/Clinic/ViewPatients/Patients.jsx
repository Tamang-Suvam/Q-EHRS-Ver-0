// import React, { useState } from 'react';

// export const Patients = ({contract}) => {
//   const [patientArray, setPatientArray] = useState([])
//   const [query, setQuery] = useState([])

//   const handleSubmit = event => {
//     event.preventDefault();
//     contract.methods.getRegisteredPatients().call()
// 		.then( patArray => {
// 			if(patArray.length === 0) {
// 				alert("No Patient has been registered yet!")
// 				return
// 			} else {
// 				setPatientArray(patArray) 
// 			} 
// 		});
//   }

//   return (
//     <div>
//         {/* <p>&nbsp;</p>
//         <h1 className='text-center fw-bolder'>View Registered Patients</h1>
//         <div className="d-grid gap-2">
//             <p>&nbsp;</p>
//             <button type="submit" className="btn btn-outline-info btn-lg btn-block fs-2"
//                     onClick={handleClick}>Show Me Registred Patients</button>
//         </div>
// 				<p>&nbsp;</p> */}
// 				<p>&nbsp;</p>
//           <form className="form-group form-control-lg" onSubmit={handleSubmit}>
// 		  <h1 className='text-center fw-bolder'>View Registered Patients</h1>
//               <label className="fs-2 form-control-lg" htmlFor="exampleFormControlTextarea1">Enter the SQL query</label>
//               <textarea className="form-control form-control-lg fs-2" id="FormControlTextarea1" rows="1"
//                         value={query} onChange={event => {setQuery(event.target.value)}} required></textarea>
//               <div className="d-grid gap-2">
//                     <p>&nbsp;</p>
//                     <button type="submit" className="btn btn-outline-info btn-lg btn-block fs-2">Enter</button>
//               </div>
//               </form>
//           <p>&nbsp;</p>
// 				{ patientArray.length === 0 ? "" :
// 					<table className="table table-hover">
// 						<thead className="table-dark">
// 							<tr>
// 							  <th scope="col" className='fs-2 text-center'>S.No.</th>
// 							  <th scope="col" className='fs-2 text-center'>Email</th>
// 							  <th scope="col" className='fs-2 text-center'>Name</th>
// 							</tr>
// 						</thead>
// 						{patientArray.map((val, index) => {
// 							return (
// 								<tbody>
// 								<tr key={index}>
// 								  <td className='fs-2 text-center'>{index + 1}</td>
// 								  <td className='fs-2 text-center'>{val.id}</td>
// 					              <td className='fs-2 text-center'>{val.name}</td>
// 								</tr>
// 								</tbody>
// 							)
// 						})}
// 					</table>
// 				}
//     </div>
//   )
// }

// export default Patients;

import React, { useState } from 'react';
import { ValidateQuery } from '../../../ValidateQuery';

export const Patients = ({contract}) => {
  const [query, setQuery] = useState([])
  const [patientArray, setPatientArray] = useState([])

  const handleSubmit = async event => {
    event.preventDefault();
    const [select, from, where_1, where_2] = ValidateQuery(query)
    if(from === 'PATIENTS') {
      if(select === '*') {
        if(where_1 === 'DEPARTMENT') {
			let patients = await contract.methods.getRegisteredPatientsByDept(where_2).call()
			if(patients.length === 0) {
				alert("No patient have been registered yet!")
			} else {
				setPatientArray(patients)
			}
		// } else if(where_1 === 'PATIENT-ID') {
		// 	let patients = await contract.methods.getRegisteredPatientsByID(where_2).call()
		// 	setPatientArray(patients)
		} else {
			let patients = await contract.methods.getRegisteredPatients().call()
			if(patients.length === 0) {
				alert("No patient have been registered yet!")
			} else {
				setPatientArray(patients)
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
              
              <h1 className='text-center fw-bolder'>View Registered Patients</h1>
              <label className="fs-2 form-control-lg" htmlFor="exampleFormControlTextarea1">Enter the SQL query</label>
              <textarea className="form-control form-control-lg fs-2" id="FormControlTextarea2" rows="1"
                        value={query} onChange={event => {setQuery(event.target.value)}} required></textarea>

              <div className="d-grid gap-2">
                    <p>&nbsp;</p>
                    <button type="submit" className="btn btn-outline-info btn-lg btn-block fs-2">Enter</button>
              </div>

          </form>
        <p>&nbsp;</p>
				{ patientArray.length === 0 ? <h5 className='text-center text-danger'>No Patients</h5> :
					<table className="table table-hover">
						<thead className="table-dark">
							<tr>
							  <th scope="col" className='fs-2 text-center'>S.No.</th>
							  <th scope="col" className='fs-2 text-center'>Address</th>
							  <th scope="col" className='fs-2 text-center'>Name</th>
							  <th scope="col" className='fs-2 text-center'>Department</th>
							</tr>
						</thead>
						{patientArray.map((val, index) => {
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
  )
}

export default Patients;