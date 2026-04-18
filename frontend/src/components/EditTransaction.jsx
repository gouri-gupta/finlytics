import { useState,useEffect } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

const EditTransaction = (props) => {

  //console.log(props)
  let {toggleModal,refreshList,currentTransaction}=props;

  //console.log(currentTransaction)
  

  let [curr,setCurr]=useState({id:currentTransaction._id,
    amount:currentTransaction.amount.toString(),
    category:currentTransaction.category,
    type:currentTransaction.type,
    date:new Date(currentTransaction.date).toISOString().split("T")[0],
    notes:currentTransaction.notes
  })
  let {id,amount,category,type,date,notes}=curr   //we will destructure state becz it is the state which controls the current transaction data

  let handleChange = (e) => {
        let { name, value } = e.target
        setCurr({ ...curr, [name]: value })
        //Even though the input type="tel" looks like a number, HTML inputs always return a string in e.target.value
  }
  
  let [errors,setErrors]=useState({})

  async function editData(obj) {
    //obj is the transaction object which needs to be edited
    //console.log(obj)
    try {
      const t=localStorage.getItem("token")
      const token=`Bearer ${t}`
      //console.log(token)
      const editobj={amount:obj.amount,category:obj.category,type:obj.type,date:obj.date,notes:obj.notes}
      const editTransaction=await axios.patch(`http://localhost:3100/api/transactions/${obj.id}`,editobj,{headers:{'Authorization':token}})
      //console.log(newtransaction)
      let {data}=editTransaction
      if(data.success){
        toast.success(data.message)
        refreshList()  //refresh latest data i.e transactions
        toggleModal()  //close modal
      }
    } 
    catch (error) {
      console.log(error.response)
      toast.error(error.response?.data?.message || "Something went wrong")  
      //navigate("/transactions")
    }
  }

  function handleSubmit(e){
    e.preventDefault()
    let validationError={}

    //see amount,type,catgory,date,notes everything is a string

    //mandatory fields are amount,type,category,date
    //notes is optional

    //validating amount -> amount should be a positive number(integer) greater than zero
    const numberRegex = /^[0-9]+$/;
    if(amount===""){  //empty
      validationError.amount="*This field is mandatory"
    }
    else if(!numberRegex.test(amount)){ //numeric check
      validationError.amount="*Please enter a valid amount"
    }
    else if(Number(amount)<=0){ //positive check
      validationError.amount="*Please enter a valid amount (greater than zero)"
    }
    

    //validating type
    //not required becz it is a drop down menu SO 1 option ie "income" by default will be selected

    //validating category
    if(category.trim()===""){
      validationError.category="*This field is mandatory"
    }

    //validating date
    if(date===""){
      validationError.date="*This field is mandatory"
    }

    setErrors(validationError)

    //now since we have validated all the fields 
    //we need to send the data to backend to create a transaction
    if(Object.keys(validationError).length === 0){
      //means no error is detected
      //so we will create a transaction to send the data to backend
      let newObj={id,amount:Number(amount),type,category: category.trim(),date,notes: notes ? notes.trim() : ""}
      editData(newObj)
    }
  }

  useEffect(() => {
    setCurr({id:currentTransaction._id,
      amount: currentTransaction.amount.toString(),
      category: currentTransaction.category,
      type: currentTransaction.type,
      date: new Date(currentTransaction.date).toISOString().split("T")[0],
      notes: currentTransaction.notes || ""
    })
}, [currentTransaction])  //for syncing edit state

  return (
    <div>
      EditTransaction

      
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Amount</label>
        <input type="text" placeholder='Enter amount' name='amount' value={amount} onChange={handleChange}/> <br />
        {errors.amount && <span>{errors.amount}</span>}  <br />

        <label htmlFor="">Type</label>
        <select name="type" id="" value={type} onChange={handleChange}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>  
        </select> <br />
        {errors.type && <span>{errors.type}</span>}  <br />


        <label htmlFor="">Category</label>
        <input type="text" placeholder='Enter category like food,rent etc' name='category' value={category} onChange={handleChange}/> <br />
        {errors.category && <span>{errors.category}</span>}  <br />

        <label htmlFor="">Date</label>
        <input type="date" name='date' value={date} onChange={handleChange}/> <br />
        {errors.date && <span>{errors.date}</span>}  <br />

        <label htmlFor="">Notes</label>
        <input type="text" placeholder='Any additional notes' name='notes' value={notes} onChange={handleChange}/> <br /> <br />

        <button type='submit'>Edit transaction</button>

      </form>
    </div>
  )
}

export default EditTransaction