import transactModel from '../models/transaction.js'
import mongoose from "mongoose";
import userModel from "../models/user.js";

//CRUD operations

//create a transaction
//we will require user Model also to get user ID for a transaction record
//userId will come from: JWT middleware
export const createTransaction=async (request,response)=>{
    try {
        

        
        //we can create a transaction
        let {amount,type,category,date,notes}=request.body
        let userId=request.user.userId

        if(!userId || !amount || !type || !category){
            return response.status(400).send({"message":"Invalid information!Please enter valid userId,amount,type and category","success":false,"result":null})
        }

         type=type.toLowerCase()
         category = category?.trim().toLowerCase()

        //check whether userId is a valid mongodb object id or not
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return response.status(400).send({
                message: "Invalid userId format",
                success: false
            });
        }

        //also whether this user exists or not
        const u=await userModel.findById(userId);
        if(!u){
            return response.status(404).send({
                message: "User not found",
                success: false
            });
        }

        if(amount<=0){
            return response.status(400).send({"message":"Invalid information!Please enter valid amount","success":false,"result":null})
        }

        if(type!=="income" && type!=="expense"){
            return response.status(400).send({"message":"Invalid information!type can only be income or expense","success":false,"result":null})
        }

        //valid information is entered so now we will create a transaction
        const obj={userId,amount,type,category,date}
        if(notes){
            obj.notes=notes;
        }
        const newT=await transactModel.create(obj)
        response.status(201).send({
            "message":"New transaction record created successfully",
            "success":true,
            "result":newT
        })

    } 
    catch (error) {
        console.log(error.message)
        response.status(500).send({"message":"Something went wrong","success":false})
    }
}

//read -> get all the transactions
//Get ALL transactions of a user

//assignment -> assignment says: filtering by type, category, date
export const getTransactions=async (request,response)=>{
    try {
        let filter={}
        filter.userId = request.user.userId

        //user is analyst OR admin => can view all the transactions over the system
        //filtering logic
        //filter by type
        if (request.query.type) {
            const type = request.query.type.toLowerCase();

            if (type !== "income" && type !== "expense") {
                return response.status(400).send({
                    message: "Invalid type filter",
                    success: false
                });
            }

            filter.type = type;
        }

        //filter by category
        if (request.query.category) {
            filter.category = request.query.category.trim().toLowerCase()
        }

        //filter by date
        if (request.query.date) {
            filter.date = new Date(request.query.date);
        }

        if (request.query.startDate && request.query.endDate) {
            filter.date = {
                $gte: new Date(request.query.startDate),
                $lte: new Date(request.query.endDate)
            };
        }

        //PAGINATION
        let page = parseInt(request.query.page) || 1;
        let limit = parseInt(request.query.limit) || 10;
        let skip = (page - 1) * limit;

        const allT=await transactModel.find(filter).sort({date:-1}).skip(skip).limit(limit);

        const total = await transactModel.countDocuments(filter); //helps the frontend determine the number of pages, manage navigation like page numbers on frontend -> better user experience


        return response.status(200).send({
            "message":"Transactions fetched successfully",
            "success":true,
            "result":allT,
            "pagination": {
                total,   //total number of transactions done by the user
                page,  //current page which is being displayed
                limit,  //number of transactions you read at a time
                totalPages: Math.ceil(total / limit)
            }
        })
    } 
    catch (error) {
        console.log(error.message)
        response.status(500).send({"message":"Something went wrong","success":false,"result":null})
    }
}

/*
PAGINATION
Pagination = breaking large data into smaller chunks (pages)

Instead of sending:1000 transactions ❌

You send:10 per request ✅

“Displaying 10 transactions on 1 page and user can move to next”

Pagination improves performance by reducing payload size, reduces server load, and enhances user experience by loading data
 incrementally instead of all at once.

🔹 Types of Pagination (Quick Awareness)
1️⃣ Offset-based (YOU will use this)
page = 1, limit = 10
skip = (page-1) * limit
2️⃣ Cursor-based (advanced)
used in large systems (like Instagram, Twitter)

👉 For your project → Offset-based is perfect

In frontend -> Add Next / Previous buttons Or page numbers
*/

//update a transaction
export const updateTransaction=async (request,response)=>{
    try {
        

        let {id}=request.params
        //we have to update the transaction with this id

        if(!id){
            return response.status(400).send({
                "message":"Invalid transaction ID",
                success:false,
                result:null
            })
        }

        //check whether is it a valid mongodb object ID or not
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({
                message: "Invalid transaction ID format",
                success: false
            });
        }

        //field validation
        //user should not be allowed to update any field because then in userID it can provide invalid userID
        //Should be allowed to update only specific fields viz amount,type,category,date

        //1. define allowed fields
        const allowedFields = ["amount", "type", "category", "date","notes"];

        //2. get fields sent by the user 
        const updateFields = Object.keys(request.body);

        //3. check if any invalid field is present
        const isValid = updateFields.every(field => allowedFields.includes(field));

        //if an invalid field is found
        if (!isValid) {
            return response.status(400).send({
                message: "Invalid fields in update.Only amount, type, category, and date can be updated",
                success: false
            });
        }

        //validaet individual fields

        //amount should be +ve 
        if (request.body.amount !== undefined && request.body.amount <= 0) {
            return response.status(400).send({
                message: "Amount must be greater than 0",
                success: false
            });
        }

        //type should only be "income" OR "expense"
        if (request.body.type) {
            const type = request.body.type.toLowerCase();

            if (type !== "income" && type !== "expense") {
                return response.status(400).send({
                    message: "Type must be income or expense",
                    success: false
                });
            }

            request.body.type = type; // normalize
        }

        //category
        if (request.body.category) {
            request.body.category = request.body.category.trim();
        }

        

        //prevent empty update
        if (updateFields.length === 0) {
            return response.status(400).send({
                message: "No fields provided for update",
                success: false
            });
        }

        const k=await transactModel.findOneAndUpdate({ _id: id, userId: request.user.userId },request.body,{returnDocument: "after",runValidators:true})

        if(!k){
            return response.status(404).send({
                message: "Transaction not found",
                success: false,
                "result":null
            }); 
        }

        response.status(200).send({
            "message":"Transaction updated successfully",
            success:true,
            result:k
        })
    } 
    catch (error) {
        console.log(error.message)
        response.status(500).send({"message":"Something went wrong","success":false})
    }
}

//delete a transaction
export const deleteTransaction=async (request,response)=>{
    try {
        

        let {id}=request.params
        //we have to delete the transaction with this id

        if(!id){
            return response.status(400).send({
                "message":"Invalid transaction ID.Cannot delete transaction",
                success:false,
                result:null
            })
        }

        //check whether is it a valid mongodb object ID or not
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({
                message: "Invalid transaction ID format.Cannot delete transaction",
                success: false,
                result:null
            });
        }
        
        //valid ID
        const k=await transactModel.findOneAndDelete({ _id: id, userId: request.user.userId })

        if(!k){
            return response.status(404).send({
                message: "Transaction not found.Cannot delete transaction",
                success: false,
                result:null
            }); 
        }

        return response.status(200).send({
            message: "Transaction deleted successfully",
            success: true,
            result:k   //returning the deleted transaction
        })
    } 
    catch (error) {
        console.log(error.message)
        response.status(500).send({"message":"Something went wrong","success":false,"result":null})
    }
}

//read a transaction OR get details of a particular transaction
export const getTransaction=async (request,response)=>{
    try {
        let {id}=request.params
        //we have to get the transaction with this id

        if(!id){
            return response.status(400).send({
                "message":"Invalid transaction ID",
                success:false,
                result:null
            })
        }

        //check whether is it a valid mongodb object ID or not
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({
                message: "Invalid transaction ID format",
                success: false,
                result: null
            });
        }

        //valid transation id -> so we will find that transaction
        const f=await transactModel.findById(id);
        //f is the transaction with _id=id

        if (!f) {
            return response.status(404).send({
                message: "Transaction not found",
                success: false,
                result: null
            });
        }

        //we also need to check whether is it a user/admin/analyst who is wanting to view the details of this transaction
        //f.userId is ObjectId , request.user.userId is string
        if(request.user.userId !== f.userId.toString()){
            //if user is a viewer then he shouldn't be allowed to view other's transactions
            return response.status(403).send({
            message: "Access denied!Cannot access the details of this transaction",
            success: false,
            result:null
            });
        }

        response.status(200).send({
            "message":"Transaction fetched successfully",
            "success":true,
            "result":f
        })
    } 
    catch (error) {
        console.log(error.message)
        response.status(500).send({"message":"Something went wrong","success":false})
    }
}




