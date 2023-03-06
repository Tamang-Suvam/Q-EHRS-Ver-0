// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Patient { 
  
  struct Record { 
    string cid;
    address patientId;
    address doctorId;
    string patientName;
    string doctorName;
    string symptoms;
    string diagnostic;
    string department;
    uint256 timeAdded;
  }

  struct PatientDetails {
    address id;
    string name;
    string department;
    string password;
  }

  struct PatientRecords {
    address id;
    Record[] records;
  }

  mapping (address => PatientDetails) public patients;
  mapping (address => PatientRecords) public patientRecords;

  address[] patientAddress;

  modifier patientExists(address patientId) {
    require(patients[patientId].id == patientId, "Patient does not exist");
    _;
  }
  
//   function doPatientExists(address patientId) public view returns(bool){
//     if(patients[patientId].id == address(0))
//         return false;
//     return true;
//   }

  function addPatient(address _patientId, string memory _name, string memory _department, string memory _password) public {
    require(patients[_patientId].id != _patientId, "This patient already exists.");
    
    PatientDetails memory patient = PatientDetails(_patientId, _name, _department, _password);
    patients[_patientId] = patient;
    patientAddress.push(_patientId);

    // emit PatientAdded(_patientId);
  }

  function addRecord(string memory _cid, address _patientId, string memory _patientName, string memory _doctorName, 
                     address _doctorId, string memory symptoms, string memory diagnostic, string memory department, 
                     uint256 time) public 
                     patientExists(_patientId){
    Record memory record = Record(_cid, _patientId, _doctorId, _patientName, _doctorName, symptoms, diagnostic, department, time);
    
    patientRecords[_patientId].records.push(record);
  } 

  function getRecords(address _patientId) public view patientExists(_patientId) returns (Record[] memory) {
    return patientRecords[_patientId].records;
  } 

  function checkPatient(address _patientId, string memory _password) public view returns (bool) {
    if (patients[_patientId].id == _patientId && 
            keccak256(abi.encodePacked(patients[_patientId].password)) == keccak256(abi.encodePacked(_password))) {
              return true;
    }
    
    return false;
  }

  function getRegisteredPatients() public view returns(PatientDetails [] memory) {
    PatientDetails[] memory patientArray = new PatientDetails[](patientAddress.length);
    
    for(uint i = 0; i < patientAddress.length; i++) {
      patientArray[i] = patients[patientAddress[i]];
    }
    
    return patientArray;
  } 

  function getRegisteredPatientsByID(address patientID) public view returns (Record[] memory) {
    return patientRecords[patientID].records;
  }

  function getRegisteredPatientsByDept(string memory deptName) public view returns (PatientDetails[] memory) {
    PatientDetails[] memory patientArray = new PatientDetails[](patientAddress.length);
    uint count = 0;

    for (uint i = 0; i < patientAddress.length; i++) {
        if (keccak256(abi.encodePacked(patients[patientAddress[i]].department)) == keccak256(abi.encodePacked(deptName))) {
            patientArray[count] = patients[patientAddress[i]];
            count++;
        }
    }

    // Resize the array length to count
    if (count < patientArray.length) {
        assembly {
            mstore(patientArray, count)
        }
    }

    return patientArray;
  }
} 
