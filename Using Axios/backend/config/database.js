import { Sequelize } from "sequelize";
 
const db = new Sequelize('testdb', 'root', 'Sairam@123', {
    host: "localhost",
    dialect: "mysql"
});
 
export default db;