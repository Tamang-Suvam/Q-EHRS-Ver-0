import Record from "../models/recordModel.js";
 
export const getAllProducts = async (req, res) => {
    try {
        const products = await Record.findAll();
        res.json(products);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const getRecordById = async (req, res) => {
    try {
        const record = await Record.findAll({
            where: {
                patientID: req.params.id
            }
        });
        res.json(record); // record[0] was there here
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const createRecord = async (req, res) => {
    try {
        await Record.create(req.body);
        res.json({
            "message": "Record Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
// export const updateProduct = async (req, res) => {
//     try {
//         await Product.update(req.body, {
//             where: {
//                 id: req.params.id
//             }
//         });
//         res.json({
//             "message": "Product Updated"
//         });
//     } catch (error) {
//         res.json({ message: error.message });
//     }  
// }
 
// export const deleteProduct = async (req, res) => {
//     try {
//         await Product.destroy({
//             where: {
//                 id: req.params.id
//             }
//         });
//         res.json({
//             "message": "Product Deleted"
//         });
//     } catch (error) {
//         res.json({ message: error.message });
//     }  
// }