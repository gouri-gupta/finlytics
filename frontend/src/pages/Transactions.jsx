import {useEffect, useState} from 'react'
import TransactionForm from '../components/TransactionForm'
import axios from 'axios'
import toast from 'react-hot-toast'
import { MdDelete,MdEdit  } from "react-icons/md";
import EditTransaction from '../components/EditTransaction';

const Transactions = () => {

  let [showAddModal,setShowAddModal]=useState(false)
  let [showEditModal,setShowEditModal]=useState(false)

  let [page,setPage]=useState(1)  //current page which is displayed 
  let [transactions,setTransactions]=useState([])   //transactions to be displayed on the current page
  let [total,setTotal]=useState(0) //contains the total number of pages that will be required to display the transactions
  let [editObj,setEditObj]=useState({})
  let [type,setType]=useState("all") //controls filter by type option
  let [category,setCategory]=useState("")  //controls search by category 
  let [date,setDate]=useState("")  //filter by date ie. transactions on a particular date

  let controlModal=()=>{
    setShowAddModal(prev => !prev)
  }

  let controlEditModal=()=>{
    setShowEditModal(prev => !prev)
  }

  async function getTransactions(){
    try {
      const t=localStorage.getItem("token")
      const token=`Bearer ${t}`
      const queryparams={page}
      if(type!="all"){
        queryparams.type=type
      }
      if(category){
        queryparams.category=category.trim().toLowerCase()
      }
      if(date){
        queryparams.date=date
      }
      let response=await axios.get(`http://localhost:3100/api/transactions`,{headers:{'Authorization':token},params:queryparams})
      //console.log(response)
      let {data}=response
      //console.log(data) 
      /*data contains object like these 
      {message: "Transactions fetched successfully"
      pagination: {total: 11, page: 1, limit: 10, totalPages: 2}
      result: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
      success: true
      } */
     setTotal(data.pagination.totalPages)
     setTransactions(data.result)
    } 
    catch (error) {
      console.log(error.message)
      toast.error("Unable to fetch the transactions")
    }
  }

  useEffect(()=>{
    getTransactions()
  },[page,type,category,date])   //Page changes → API call

  /**After any mutation (create / delete / update): -> REFRESH THE LIST */

  // Create an array [1, 2, 3, ..., safeMax]
  const numbers = Array.from({ length: total }, (_, i) => i + 1);  //page numbers generation
  //console.log(numbers)

  //delete transaction
  async function deleteTransaction(id) {
    if(!window.confirm("Are you sure you want to delete this transaction?")) return;
    //delete transaction with _id =id
    //console.log("Deleting transaction")
    //console.log(id)
    try {
      const t=localStorage.getItem("token")
      const token=`Bearer ${t}`
      const response=await axios.delete(`http://localhost:3100/api/transactions/${id}`,{headers:{'Authorization':token}})
      //console.log(response)
      //again here if the transaction is deleted successfully we will give toast message + refresh list of transactions
      let {data}=response
      if(data.success){
        toast.success(data.message)
        if(transactions.length === 1 && page > 1){
          setPage(prev => prev - 1)
        } 
        else {
          getTransactions()
        }
      }
    } 
    catch (error) {
      console.log(error.message)
      toast.error("Unable to delete")   
    }
  }
  

  function editTransaction(obj){
    //obj is the transaction object which is to be edited
    setEditObj(obj)
    controlEditModal()
  }

  let handleTypeChange=(e)=>{
    let { name, value } = e.target
    setType(value)
    setPage(1)
    //console.log(name,value)
  }

  let handleCategoryChange=(e)=>{
    let {name,value}=e.target
    setCategory(value)
    setPage(1)
  }

  let handleDateChange=(e)=>{
    let {name,value}=e.target
    setDate(value)
    setPage(1)
  }

  let clearFilters=()=>{
    setType("all")
    setCategory("")
    setDate("")
    setPage(1)
  }

  return (

    <main>

      {/**heading like your trnasactions */}

      {/**Filters */}

      {/**Filter by type : All,income,expense */}
      <label htmlFor="">Filter by type</label>
      <select name="type" id="" value={type} onChange={handleTypeChange}>
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <br /> <br />

      {/**Filter by category */}
      <input type="text" value={category} placeholder='Search by category' onChange={handleCategoryChange}/> <br /> <br />

      {/**Filter by date */}
      <label htmlFor="">Filter by date</label>
      <input type="date" value={date} onChange={handleDateChange}/> <br /><br />

      {/**Clear all filters */}
      <button onClick={clearFilters}>Clear filters</button> <br /><br />

      {/**Create transaction */}
      <button onClick={controlModal}>Add transaction</button>

      {
        showAddModal && 
        <div>
          <button onClick={controlModal}>✕</button>
          <TransactionForm toggleModal={controlModal} refreshList={getTransactions}></TransactionForm>
        </div>
      }

      {/**display all the transactions See 1st 10 transactions on 1 page and then rest page in footer and so on */}
      <h1>List of transactions</h1>

      {
        transactions.length===0 ? (
          <h1>No transactions found</h1>
        ) : (
          transactions.map((t)=>(
          <div key={t._id}>
            <p>Amount : {t.amount}</p>
            <p>Type : {t.type}</p>
            <p>Category : {t.category}</p>
            <p>Date : {new Date(t.date).toLocaleDateString()}</p>
            <p>Notes : {t.notes}</p>
            <button onClick={()=>editTransaction(t)} disabled={showEditModal}><span><MdEdit/></span></button>
            <button onClick={()=>deleteTransaction(t._id)}><span><MdDelete/></span></button>
            
            <hr />
          </div>
        ))
        )
      }
      
      
      {
              showEditModal && 
              <div>
                <button onClick={controlEditModal}>✕</button>
                <EditTransaction toggleModal={controlEditModal} refreshList={getTransactions} currentTransaction={editObj}></EditTransaction>
              </div>
      }
      

      {/**footer which display all the page numbers */}
      {/**We will have page nos like 1 2 3  When user clicks on those page numbers then transactions on those page will be displayed */}
      <div>
        <h3>Footer</h3>  {/**I have added this here just for better understanding I will remove this later during styling */}
        {/**highlight current page */}
        <ul>
        {
          numbers.map((num)=>(
            <li key={num}>
              <button onClick={()=>setPage(num)}>{num}</button>
            </li>
          ))
        }
      </ul>
      </div>

    </main>
  )
}

export default Transactions