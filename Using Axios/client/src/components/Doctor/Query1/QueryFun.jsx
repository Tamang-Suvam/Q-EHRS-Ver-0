import React, { useState  } from "react";
import { ValidateQuery } from "../../../ValidateQuery";

export default function QueryFun({contract}) {
  const [query, setQuery] = useState([])
  const [patientArray, setPatientArray] = useState([])
  const [file, setFile] = useState(null)
  const [resTime, setresTime] = useState(0)
  
  /////////////////////////////// Reading from a file of queries//////////////////////////////////////////////////////////
  const captureFile = (event) => {
    event.preventDefault()
    const _file = event.target.files[0]
    setFile(_file)
  }

  const handleSubmit = async (event) => {
  event.preventDefault();
  let startTime = 0, endTime = 0, seconds = 0
  let time = 0

  const reader = new FileReader()
  reader.onload = async (e) => { 
    const text = (e.target.result)
      var queries = text.split(/\r\n|\n/);
      for(let query = 0; query < queries.length - 1; query++){
        const [select, from, where_1, where_2 ] = ValidateQuery(queries[query])
        if(from === 'PATIENTS') {
          if(select === '*') {
            if(where_1 === 'DEPARTMENT') {
              alert("You don't have permission to fire this query!")
            } else if(where_1 === 'PATIENT-ID') {

              startTime = performance.now()
              let patients = await contract.methods.getRegisteredPatientsByID(where_2).call()
              endTime = performance.now()
              
              seconds = (endTime - startTime)
              time += seconds

                if(patients.length === 0) {
                  alert("No patients to display!")
                } else {
                  setPatientArray(patients)
                }
            } else {
              alert("You don't have permission to fire this query!")
            }
          }
        } else {
          alert("Invalid SQL Query!")
        }
      }
      setresTime(time)
  };
  reader.readAsText(file)
}

  return (
    <div>
        <p>&nbsp;</p>
          <div className="form-group fs-2">
            <form className='form-control' onSubmit={handleSubmit}>
                <input type="file" className='form-control fs-2' onChange={captureFile} />
                <div className="d-grid gap-2">
                  <p>&nbsp;</p>
                  <button type="submit" className="btn btn-outquery-primary btn-lg btn-block fs-2" 
                          >Submit</button>
                </div>
              </form>
              <h1>Executing your query!</h1>
              <p>Blockchain Time : {resTime}</p>
          </div>
    </div>
  );
}