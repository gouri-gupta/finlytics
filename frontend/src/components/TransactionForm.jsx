import {useState} from 'react'
import toast from 'react-hot-toast'
//import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const TransactionForm = (props) => {

  //console.log(props)
  let {toggleModal,refreshList}=props;
  //console.log(toggleModal)

  

  let [transaction,setTransaction]=useState({
    amount:"",
    type:"income",
    category:"",
    date:"",
    notes:""
  })

  let {amount,type,category,date,notes}=transaction

  let [errors,setErrors]=useState({})

  async function sendData(obj) {
    //obj is the data which will be sent to backend to create a transaction
    //console.log(obj)
    try {
      const t=localStorage.getItem("token")
      const token=`Bearer ${t}`
      //console.log(token)
      const newtransaction=await axios.post(`https://finlytics-backend-t4r0.onrender.com/api/transactions`,obj,{headers:{'Authorization':token}})
      //console.log(newtransaction)
      let {data}=newtransaction
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

  let handleChange = (e) => {
        let { name, value } = e.target
        setTransaction({ ...transaction, [name]: value })
        //Even though the input type="tel" looks like a number, HTML inputs always return a string in e.target.value
  }

  let handleSubmit=(e)=>{
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
      let newObj={amount:Number(amount),type,category: category.trim(),date,notes:notes.trim()}
      sendData(newObj)
    }
    
  }


  return (
    <div className="flex flex-col gap-4">

      <h1 className="text-xl font-bold text-gray-800 dark:text-white text-center">
        Add Transaction
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        {/* Amount */}
        <div>
          <label className="text-sm text-gray-500 dark:text-gray-400">Amount</label>
          <input
            type="text"
            name="amount"
            value={amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="w-full px-3 py-2 mt-1 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#0F172A] text-gray-800 dark:text-white focus:border-indigo-500 outline-none"
          />
          {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
        </div>

        {/* Type */}
        <div>
          <label className="text-sm text-gray-500 dark:text-gray-400">Type</label>
          <select
            name="type"
            value={type}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#0F172A] text-gray-800 dark:text-white"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="text-sm text-gray-500 dark:text-gray-400">Category</label>
          <input
            type="text"
            name="category"
            value={category}
            onChange={handleChange}
            placeholder="food, rent..."
            className="w-full px-3 py-2 mt-1 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#0F172A] text-gray-800 dark:text-white"
          />
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        </div>

        {/* Date */}
        <div>
          <label className="text-sm text-gray-500 dark:text-gray-400">Date</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#0F172A] text-gray-800 dark:text-white"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>

        {/* Notes */}
        <div>
          <label className="text-sm text-gray-500 dark:text-gray-400">Notes</label>
          <input
            type="text"
            name="notes"
            value={notes}
            onChange={handleChange}
            placeholder="Optional notes"
            className="w-full px-3 py-2 mt-1 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#0F172A] text-gray-800 dark:text-white"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-md transition"
        >
          Add Transaction
        </button>

      </form>
    </div>
  )
}

export default TransactionForm