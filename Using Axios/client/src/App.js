import React, {useState, useEffect} from 'react';
import Footer from "./components/Footer";
import Doctor  from "./components/Doctor";
import Patient from './components/Patient';
import NavbarDoctor from "./components/Doctor/NavbarDoctor";
import NavbarPatient from './components/Patient/NavbarPatient';
import Home from "./components/Home";
import IPFS from "./components/IPFS";
import Web3 from 'web3';
// import QEHR from './contracts/EHR.json';
import DoctorLogin from "./components/Doctor/DoctorLogin";
import Query1 from "./components/Doctor/Query1";
import Query2 from "./components/Doctor/Query2";
import Start from './components/Start';
import Clinic from './components/Clinic';
import PatientLogin from './components/Patient/PatientLogin';
import CRegister from './components/Clinic/CRegister';
import CLogin from './components/Clinic/CLogin';

import clinic from './contracts/Clinic';
import doctor from './contracts/Doctor';
import patient from './contracts/Patient';
// import ProtectedRoutes from './components/ProtectedRoutes';

import "./App.css";
import {
  Routes,
  Route,
} from "react-router-dom";
import NavbarClinic from './components/Clinic/NavbarClinic';


function App() {
  const [account, setAccount] = useState(null);
  // const [contract, setContract] = useState(null);
  const [clinicContract, setClinicContract] = useState(null);
  const [doctorContract, setDoctorContract] = useState(null);
  const [patientContract, setPatientContract] = useState(null);
  // const navigate = useNavigate();

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. Please install MetaMask to work with the DApp!')
    }
  }
 
  async function loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    setAccount(accounts[0])
    const networkId = await web3.eth.net.getId()
    const networkData1 = clinic.networks[networkId]
    const networkData2 = doctor.networks[networkId]
    const networkData3 = patient.networks[networkId]
    if(networkData1 || networkData2 || networkData3) {
      const _clinicContract = new web3.eth.Contract(clinic.abi, networkData1.address)
      const _doctorContract = new web3.eth.Contract(doctor.abi, networkData2.address)
      const _patientContract = new web3.eth.Contract(patient.abi, networkData3.address)
      setClinicContract(_clinicContract)
      setDoctorContract(_doctorContract)
      setPatientContract(_patientContract)
      // const _ehrHash = await contract.methods.get().call()
      // setehrHash(_ehrHash)
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  return (
    <div className="mb-3 p-4">
        <Routes>
          {/* <Route exact path = "/" element = {[<Home />, <Start />, <Footer />]} /> */}
          <Route exact path = "/" element = {<Home />} />
          <Route exact path = "/start_page" element = {[<Start />, <Footer />]} />
          <Route exact path = "/patient_login" element = {[<NavbarPatient />, <PatientLogin contract = {patientContract}/>]} />
          <Route exact path = "/patient_page" element = {[<NavbarPatient />, <Patient contract={patientContract}/>]} />
          {/* <ProtectedRoutes exact path = "/doctor_page">
            <Doctor contract={contract} account={account} />
          </ProtectedRoutes> */}
          {/* <Route exact path = "/doctor_page" element = {<ProtectedRoutes>
            <Doctor contract={contract} account={account} />
          </ProtectedRoutes>} /> */}
          <Route exact path = "/doctor_login" element = {[<NavbarDoctor />, <DoctorLogin contract = {doctorContract}/>]} />
          <Route exact path = "/doctor_page" element = {<Doctor contract={doctorContract} account={account}/>} />
          <Route exact path = "/clinic_registration" element = {[<NavbarClinic/>, <CRegister contract={clinicContract} account={account}/>]} />
          <Route exact path = "/clinic_login" element = {<CLogin contract = {clinicContract}/>} />
        <Route exact path = "/clinic_page" element = {<Clinic clinic_contract = {clinicContract} doctor_contract = {doctorContract}
                                                              patient_contract = {patientContract} account={account}/>} />
          <Route exact path = "/query1_page" element = {[<NavbarDoctor />, <Query1 contract={patientContract}/>]} />
          <Route exact path = "/query2_page" element = {[<NavbarDoctor />, <Query2 />]} />
          <Route exact path = "/ipfs_page" element = {[<NavbarDoctor />, <IPFS />]} />
        </Routes>  
        {/* <Footer /> */}
    </div>
  );
}

export default App;