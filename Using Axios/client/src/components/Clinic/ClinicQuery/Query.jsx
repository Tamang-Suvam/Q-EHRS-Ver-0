import React, { useState  } from "react";

export default function Query({contract}) {
  const [query, setQuery] = useState([])
  const [file, setFile] = useState(null)
  const [resTime, setresTime] = useState(0)
  const [doctorArray, setDoctorArray] = useState([])
//   let doctorArray = []
  const [patientArray, setPatientArray] = useState([])
  const [fromParameter, setFromParameter] = useState('')
  let selectParameter = ''
//   let fromParameter = ''
  let whereParam1 = ''
  let whereParam2 = ''
  let whereParam3 = ''

    const captureFile = (event) => {
        event.preventDefault()
        const _file = event.target.files[0]
        setFile(_file)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        var queries = query.toUpperCase().split(" ");
        // console.log(queries.length)
        // for(let query = 0; query < queries.length-1; query++){
            // let myArray = queries[query].split(" ")
            for(let i=0; i<queries.length; i++) {
                if(queries[i] === 'SELECT') {
                    selectParameter = queries[++i]
                } else if(queries[i] === 'FROM') {
                    // fromParameter = queries[++i]
                    setFromParameter(queries[++i])
                } else if(queries[i] === 'WHERE') {
                    whereParam1 = queries[++i]
                    whereParam2 = queries[++i]
                    whereParam3 = queries[++i]
                }
            }
            
        // contract.methods.getRegisteredPatients().call()
        //     .then( patArray => {
        //         if(patArray.length === 0) {
        //             alert("No Patient has been registered yet!")
        //             return
        //         } else {
        //             setPatientArray(patArray) 
        //         } 
        //     });
        // event.preventDefault();
        // let time = 0
        // let startTime1 = 0, startTime2 = 0, endTime1 = 0, endTime2 = 0, seconds1 = 0, seconds2 = 0
        // const reader = new FileReader()
        // reader.onload = async (e) => { 
        // const text = (e.target.result)
        //     var queries = text.split(/\r\n|\n/);
        //     console.log(queries.length-1)
        //     for(let query = 0; query < queries.length-1; query++){
        //     let selectParameter = ''
        //     let fromParameter = ''
        //     let whereParam1 = ''
        //     let whereParam2 = ''
        //     let whereParam3 = ''
        //     let queries = queries[query].split(" ")
        //     for(let i=0; i<queries.length; i++) {
        //         if(queries[i] === 'select') {
        //         selectParameter = queries[++i]
        //         } else if(queries[i] === 'from') {
        //         fromParameter = queries[++i]
        //         } else if(queries[i] === 'where') {
        //         whereParam1 = queries[++i]
        //         whereParam2 = queries[++i]
        //         whereParam3 = queries[++i]
        //         }
        //     }
            if( fromParameter === 'PATIENTS' ) {
                let patients = await contract.methods.getRegisteredPatients().call()
                if(patients.length === 0) {
                    alert("No Patient Found!")
                    return
                } else {
                    setPatientArray(patients) 
                } 
                // endTime1 = Date.now();
                // seconds1 = (endTime1 - startTime1) 
                // time += seconds1
                // console.log(typeof x)
                // contract.methods.getRecords(whereParam3).call()
                // .then( x => {
                //   console.log("here2")
                //   if(x.length === 0) {
                //     alert("No Record Found!")
                //     return
                //   } else {
                //     setPatResult(x) 
                //   } 
                // });
                // x = []
            }
            else if( fromParameter === 'DOCTORS') {
            //   startTime2 = performance.now();
              let doctors = await contract.methods.getRegisteredDoctors().call()
              if(doctors.length === 0) {
                  alert("No Doctors Found!")
                  return
              } else {
                  setDoctorArray(doctors) 
                    // doctorArray = doctors;
                    // console.log(doctorArray.length)
              } 
            //   .then( x => {
            //     if(x.length === 0) {
            //       alert("No Record Found!")
            //       return
            //     } else {
            //       setDocResult(x) 
            //     }
            //   })
            //   endTime2 = performance.now();
            //   seconds2 = (endTime2 - startTime2) / 1000
            //   // console.log("Seconds2" + seconds2)
            //   time += seconds2
            } 
            // }
        //     // console.log("Total Time(Blockchain): " + time)
        //     setresTime(time)
        // };
        // reader.readAsText(file)
        // }
    }
  
    return (
        <div>
        <p>&nbsp;</p>
             <form className="form-group form-control-lg"> 

                <h1 className='text-center fw-bolder'>Query Section</h1>
                <label className="fs-2 form-control-lg" htmlFor="exampleFormControlTextarea1">Enter the SQL query</label>
                <textarea className="form-control form-control-lg fs-2" id="FormControlTextarea1" rows="1"
                          value={query} onChange={event => {setQuery(event.target.value)}} required></textarea>

                <div className="d-grid gap-2">
                      <p>&nbsp;</p>
                      <button type="submit" className="btn btn-outline-info btn-lg btn-block fs-2"
                              onClick={handleSubmit}>Enter</button>
                </div>
                </form>
          <p>&nbsp;</p>
          {/* { doctorArray.length === 0 ? "" :
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col" className='fs-2 text-center'>S.No.</th>
                  <th scope="col" className='fs-2 text-center'>DoctorID</th>
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
          } */}
          {/* {
            fromParameter === 'PATIENT' ? (
                { doctorArray.length === 0 ? "" :
                    <table className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                        <th scope="col" className='fs-2 text-center'>S.No.</th>
                        <th scope="col" className='fs-2 text-center'>DoctorID</th>
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
            ) : ""
          } */}
    </div>
  );
}
