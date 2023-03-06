import express from "express";
 
import { 
    getAllProducts,
    createRecord,
    getRecordById,
    // updateProduct,
    // deleteProduct
} from "../controllers/Records.js";
 
const router = express.Router();
 
router.get('/', getAllProducts);
router.get('/:id', getRecordById);
router.post('/', createRecord);
// router.patch('/:id', updateProduct);
// router.delete('/:id', deleteProduct);
 
export default router;