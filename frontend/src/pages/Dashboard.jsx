import {useState,useEffect} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { PieChart, Pie, Cell, Tooltip, Legend,BarChart, Bar, XAxis, YAxis, CartesianGrid,LineChart, Line } from "recharts";

const Dashboard = () => {

  let [income,setIncome]=useState(0)
  let [expense,setExpense]=useState(0)
  //let [balance,setBalance]=useState(income-expense)
  let [dashboardData,setDashboard]=useState({}) //it is an object like {totalIncome,totalExpense,netBalance,categoryBreakdown,recentTransactions}

  //filter options -> filter by month,year
  let [month, setMonth] = useState("");
  let [year, setYear] = useState(""); //new Date().getFullYear()

  async function getDashboardData(){
    try { 
      const t=localStorage.getItem("token")
      const token=`Bearer ${t}`
      const query = {};
      if(month) query.month = month;
      if(year) query.year = year;
      let response=await axios.get(`http://localhost:3100/api/dashboard`,{headers:{'Authorization':token},params:query})
      //console.log(response)
      let {data}=response
      //console.log(data)
      let {result}=data
      console.log(result)  //result is this object {totalIncome,totalExpense,netBalance,categoryBreakdown,recentTransactions}
      setDashboard(result)
      setIncome(result.totalIncome)
      setExpense(result.totalExpense)
      //setBalance(result.netBalance)
    } 
    catch (error) {
      console.log(error.message) 
      toast.error("Unable to fetch dashboard") 
    }
  }

  useEffect(()=>{
    getDashboardData()
  },[month,year])

  const pieData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense }
  ]

  const categoryData = (dashboardData.categoryBreakdown || []).map(item => ({
    name: item._id,
    value: item.total
  }))

  /**No need to create a state for categroyData OR pieData BECAUSE these are derived data (computer from state)
   * We already have income , expense ,dashboardData
   * SO,
   * pieData → derived from income/expense
   * categoryData → derived from dashboardData
   */

  const trendData = (dashboardData.monthlyTrends || []).map(item => ({
    name: `${item._id.month}/${item._id.year}`,
    income: item.income,
    expense: item.expense
  }))


  return (
    <main>
      <h1>From transactions to insights — take control of your finances</h1>

      {/**filter by month and year */}
      <label htmlFor="">Filter by month</label>
      <select onChange={(e)=>setMonth(e.target.value)}>
        <option value="">All Months</option>
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>

      <label htmlFor="">Filter by year</label>
      <select onChange={(e)=>setYear(e.target.value)}>
        <option value="">All Years</option>
        <option value="2026">2026</option>
        <option value="2025">2025</option>
      </select>

      {/**3 summary cards */}
      <h1>Your Financial Snapshot at a Glance</h1>
      <h1>Income = {income}</h1>
      <h1>Expense = {expense}</h1>
      <h1>Net balance = {dashboardData.netBalance}</h1>
      <br />

      {/**pie chart income vs expense */}
      <h1>Income vs Expense Overview</h1>
      <PieChart width={300} height={300}>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
        >
          <Cell fill="#4CAF50" />  {/* income */}
          <Cell fill="#F44336" />  {/* expense */}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      <br />

      {/**category breakdown Bar chart*/}
      <h1>Spending by Category</h1>
      <BarChart width={400} height={300} data={categoryData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
      <br />

      {/**monthly trends */}
      <h1>Your Financial Journey Over Time</h1>
      <LineChart width={500} height={300} data={trendData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="income" stroke="#4CAF50" />
        <Line type="monotone" dataKey="expense" stroke="#F44336" />
      </LineChart>
      <br />

      {/**just display recent transactions  same as transactions page*/}
      <h1>Recent Activity</h1>
      {
        (dashboardData.recentTransactions || []).map((item)=>(
          <div key={item._id}>
            <p>Amount = {item.amount}</p>
            <p>Type = {item.type}</p>
            <p>Date = {new Date(item.date).toLocaleDateString()}</p>
            <p>Category = {item.category}</p>
            <p>Notes = {item.notes}</p>
            <hr />
          </div>
        ))
      }

    </main>
  )
}

export default Dashboard

/*
Top:

🟢 Summary Cards (Top section)
Total Income
Total Expense
Net Balance

Middle:

🥧 Pie Chart (income vs expense) 
Shows:how much you earn vs spend

Bottom:

📊 Category Chart
    use Pie chart OR bar chart -> shows spending pattern

📋 Recent Transactions
Just display:last 5 transactions
*/

/* LATER
monthly/weekly trends 
build: Line chart (monthly trend)

add aggregation $group by month
*/ 

/*
How Charts Work (Simple Explanation)

You pass:

data = [
  { name: "Income", value: 5000 },
  { name: "Expense", value: 3000 }
]

Then library renders chart automatically.

👉 No complex math needed.
*/


