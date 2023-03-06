// SPDX-License-Identifier: MIT
pragma solidity >= 0.4.22 <0.9.0;

// Using Doctor and Patient Contracts here as well
import "./Doctor.sol";
import "./Patient.sol";

// Let's inherit from both the Doctor and Patient Smart Contracts
contract Clinic {
    // So to deploy Clinic contract first the doctor and patient contracts should have been deployed first.
    // The Clinic constructor takes in as input the doctorContract and patientContract address
    address doctorContractAddress;
    address patientContractAddress;

    constructor(
      address DoctorContractAddress,
      address PatientContractAddress
    ){
        doctorContractAddress = DoctorContractAddress;
        patientContractAddress = PatientContractAddress;
    }

    // This structure would capture the clinic entity
    struct ClinicDetails {
        address id;
        string name;
        string password;
    }

    // All the data structures used for storing clinic details defined 
    mapping (address => ClinicDetails) public clinics;
    address[] clinicAddress;
    // Doctor doctorContract = Doctor(doctorContractAddress);

    // All the events to be emitted here
    event ClinicAdded(address indexed clinicId, string clinicName);
    event DoctorAdded(address indexed doctorId);

    // All the modifiers used have been defined below
    modifier senderIsClinic {
        require(clinics[msg.sender].id == msg.sender, "Clinic does not exist");
        _;
    }

    // All the method definition below
    function addClinic(string memory _clinicName, string memory _password) public {
        require(clinics[msg.sender].id != msg.sender, "This clinic already exists.");
        ClinicDetails memory clinic = ClinicDetails(msg.sender, _clinicName, _password);
        clinics[msg.sender] = clinic; 
        clinicAddress.push(msg.sender);

        emit ClinicAdded(msg.sender, _clinicName);
    }

    function checkClinic(string memory _password) public view returns (bool) {
        if(clinics[msg.sender].id == msg.sender && 
                (keccak256(abi.encodePacked(clinics[msg.sender].password)) == keccak256(abi.encodePacked(_password)))) {
                return true;
        } 
        return false;
    }

    function clinicAddDoctor(address _doctorId, string memory _doctorName, string memory _clinicName, string memory _dept, string memory _password) 
           senderIsClinic public {
        Doctor doctorContract = Doctor(doctorContractAddress);
        doctorContract.addDoctor(_doctorId, _doctorName, _clinicName, _dept, _password);
        emit DoctorAdded(_doctorId);
    }

    // function clinicGetRegisteredDoctors() public view senderIsClinic {
    //     Doctor doctorContract = Doctor(doctorContractAddress);
    //     doctorContract.getRegisteredDoctors();
    // }
} 
