import { createTransaction,getTransaction,getTransactions,updateTransaction,deleteTransaction } from "../controllers/transactionController.js";
import express from 'express'
import authMiddleware from "../middleware/authmiddleware.js";

const router=express.Router()

//Get ALL transactions (with role logic)
// Viewer → own transactions
//Analyst/Admin → all transactions
router.get("/", authMiddleware, getTransactions)  //handle roles inside controller
/*
Inside getTransactions
if(user.role === "viewer"){
   → return only user's transactions
}
else{
   → return all transactions
}
*/

//read details of a particular transaction
router.get("/:id",authMiddleware,getTransaction)

//create a tranasaction 
router.post("/",authMiddleware,createTransaction)

//update a transaction 
router.patch("/:id",authMiddleware,updateTransaction)

//delete a transaction 
router.delete("/:id",authMiddleware,deleteTransaction)


export default router



