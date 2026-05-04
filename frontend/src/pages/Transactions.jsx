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
      let response=await axios.get(`https://finlytics-backend-t4r0.onrender.com/api/transactions`,{headers:{'Authorization':token},params:queryparams})
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
      const response=await axios.delete(`https://finlytics-backend-t4r0.onrender.com/api/transactions/${id}`,{headers:{'Authorization':token}})
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

    <main className=' flex flex-col gap-10'> {/**border border-black */}

      {/**heading like your trnasactions */}
      {/**SECTION1 */}
      <section className='bg-white border border-gray-200 rounded-lg shadow-md dark:shadow-xl dark:bg-[#1E293B] dark:border-[#334155] flex flex-col gap-5'>
        
      {/**Filters */} 
        <div className=' flex flex-col lg:flex-row gap-2 lg:gap-0 justify-between content-center mt-1'> {/**border border-yellow-700 */}

          <div className=' lg:content-end lg:ml-1'> {/**border border-teal-700 */}  
            {/**Filter by category */}
            <input type="text" value={category} placeholder='Search by category' onChange={handleCategoryChange} className='p-1 italic bg-[#F9FAFB] border border-gray-300 rounded-md text-[#111827] dark:text-[#F9FAFB] focus:border-indigo-500 dark:bg-[#0F172A]'/>
            </div>

          <div className=' flex flex-col gap-1'> {/**border border-teal-700 */}
             {/**Filter by type : All,income,expense */}
            <label htmlFor="" className='text-gray-600 dark:text-gray-400 font-medium text-lg'>Filter by type</label>
            <select name="type" id="" value={type} onChange={handleTypeChange} className='p-1 bg-[#F9FAFB] border border-gray-300 rounded-md text-[#111827] dark:text-[#F9FAFB] focus:border-indigo-500 dark:bg-[#0F172A]'>
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className=' flex flex-col gap-1'> {/**border border-teal-700 */}  
            {/**Filter by date */}
            <label htmlFor="" className='text-gray-600 dark:text-gray-400 font-medium text-lg'>Filter by date</label>
            <input type="date" value={date} onChange={handleDateChange} className='p-1 bg-[#F9FAFB] border border-gray-300 rounded-md text-[#111827] dark:text-[#F9FAFB] focus:border-indigo-500 dark:bg-[#0F172A]'/> 
            </div>

            <div className=' lg:content-end lg:mr-1'> {/**border border-teal-700 */}
              {/**Clear all filters */}
              <button onClick={clearFilters} className='px-2 py-1 font-normal border border-gray-300 text-gray-700 bg-transparent rounded-md dark:bg-gray-400 hover:bg-gray-100 dark:hover:bg-[#334155] dark:border-gray-600 dark:text-gray-300'>Clear filters</button>  
            </div>
        </div> 

        <div className=' flex lg:justify-end lg:m-1'> {/**border border-green-800 */}
          {/**Create transaction */}
          <button onClick={controlModal} className='bg-indigo-500 border-2 border-indigo-950  text-xl text-white font-bold px-2 py-1 rounded-lg hover:bg-indigo-900'>Add transaction</button>
        </div>
      </section>

      {
        showAddModal && 
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="relative w-[90%] max-w-md bg-white dark:bg-[#1E293B] rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">

            {/* Close Button */}
            <button
              onClick={controlModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              ✕
            </button>

            <TransactionForm 
              toggleModal={controlModal} 
              refreshList={getTransactions} 
            />

          </div>
        </div>
      }

      {/**SECTION 2 */}
      {/**display all the transactions See 1st 10 transactions on 1 page and then rest page in footer and so on */}
      <section className=''> {/**border border-green-900 */}
        <h1 className='text-[#6B7280] lg:text-xl font-semibold italic dark:text-[#9CA3AF] m-2'>List of transactions</h1>

        <div className='	grid md:grid-cols-2 lg:grid-cols-2 gap-5 '> {/**border border-orange-700  */}
            {
            transactions.length===0 ? (
              <h1 className='text-[#6B7280] lg:text-xl font-semibold italic dark:text-[#9CA3AF]'>No transactions found</h1>
            ) : (
              transactions.map((t)=>(
              <div key={t._id} className='p-2 border border-gray-200 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 bg-white text-gray-900 dark:border-gray-700 dark:bg-[#1E293B] dark:text-gray-100'>
                <p className='font-medium text-lg '>{t.category}</p>
                <div className='flex flex-row gap-3'>
                  <p className='font-bold text-xl'>₹{t.amount}</p>
                  {
                    t.type==="income" ? <p className='text-green-500 font-bold'>{t.type}</p> : <p className='text-red-500 font-bold'>{t.type}</p>
                  }
                </div>
                <p className='text-base'>Date : {new Date(t.date).toLocaleDateString()}</p>
                <p className='text-sm'>Notes : {t.notes}</p>
                <div className='flex flex-row gap-3'>
                  <button onClick={()=>editTransaction(t)} className='bg-indigo-500 border-2 border-indigo-950  text-xl text-white font-bold p-1 rounded-full hover:bg-indigo-900' disabled={showEditModal}><span><MdEdit/></span></button>
                  <button onClick={()=>deleteTransaction(t._id)} className='bg-indigo-500 border-2 border-indigo-950  text-xl text-white font-bold p-1 rounded-full hover:bg-indigo-900'><span><MdDelete/></span></button>
                </div>
              </div>
            ))
            )
          }
        </div>
      </section>
      
      
      {
        showEditModal && 
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="relative w-[90%] max-w-md bg-white dark:bg-[#1E293B] rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">

            {/* Close Button */}
            <button
              onClick={controlEditModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              ✕
            </button>

            <EditTransaction 
              toggleModal={controlEditModal} 
              refreshList={getTransactions} 
              currentTransaction={editObj}
            />

          </div>
        </div>
      }
      

      {/**footer which display all the page numbers */}
      {/**We will have page nos like 1 2 3  When user clicks on those page numbers then transactions on those page will be displayed */}
      {/**SECTION 3 */}
      <section className="flex justify-center mt-6">
         {/**I have added this here just for better understanding I will remove this later during styling */}
        {/**highlight current page */}
        <ul className="flex gap-2 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E293B] shadow-sm">
        {
          numbers.map((num)=>(
            <li key={num}>
              <button onClick={()=>setPage(num)} className={`min-w-[32px] text-center px-3 py-1 rounded-md text-sm font-semibold transition-all duration-200
                ${page === num
                  ? 'bg-indigo-500 text-white shadow-md scale-105'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-[#334155] hover:scale-105'}
              `}>{num}</button>
            </li>
          ))
        }
        </ul>
      </section>

    </main>
  )
}

export default Transactions