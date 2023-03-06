var Clinic = artifacts.require("Clinic");
var Doctor = artifacts.require("Doctor");
var Patient = artifacts.require("Patient");

module.exports = async function(deployer) {
    await deployer.deploy(Patient)
    await deployer.deploy(Doctor, Patient.address)
    await deployer.deploy(Clinic, Doctor.address, Patient.address)
};