import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Record = db.define('medicalrecords',{
    cid:{
        type: DataTypes.STRING
    },
    patientID:{
        type: DataTypes.STRING
    },
    patientName:{
        type: DataTypes.STRING
    },
    doctorID: {
        type: DataTypes.STRING
    },
    doctorName:{
        type: DataTypes.STRING
    },
    symptoms:{
        type: DataTypes.STRING
    },
    diagnostic:{
        type: DataTypes.STRING
    },
    department:{
        type: DataTypes.STRING
    },
    timeAdded:{
        type: DataTypes.DATE
    }
},{
    freezeTableName: true
});
 
export default Record;