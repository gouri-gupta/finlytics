import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, ResponsiveContainer
} from "recharts";

const Dashboard = () => {

  let [income, setIncome] = useState(0)
  let [expense, setExpense] = useState(0)
  let [dashboardData, setDashboard] = useState({})

  let [month, setMonth] = useState("")
  let [year, setYear] = useState("")

  async function getDashboardData() {
    try {
      const t = localStorage.getItem("token")
      const token = `Bearer ${t}`
      const query = {}
      if (month) query.month = month
      if (year) query.year = year

      let response = await axios.get(
        `https://finlytics-backend-t4r0.onrender.com/api/dashboard`,
        { headers: { 'Authorization': token }, params: query }
      )

      let { result } = response.data
      setDashboard(result)
      setIncome(result.totalIncome)
      setExpense(result.totalExpense)

    } catch (error) {
      toast.error("Unable to fetch dashboard")
    }
  }

  useEffect(() => {
    getDashboardData()
  }, [month, year])

  const pieData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense }
  ]

  const categoryData = (dashboardData.categoryBreakdown || []).map(item => ({
    name: item._id,
    value: item.total
  }))

  const trendData = (dashboardData.monthlyTrends || []).map(item => ({
    name: `${item._id.month}/${item._id.year}`,
    income: item.income,
    expense: item.expense
  }))

  return (

<main className="flex flex-col gap-8">

  {/* 🔹 HEADING */}
  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
      From transactions to insights
    </h1>
    <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
      Take control of your finances
    </p>
  </div>


  {/* 🔹 FILTERS */}
  <section className="p-4 rounded-xl bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-4">

    <div className="flex flex-col sm:flex-row gap-4 w-full">

      <div className="flex flex-col w-full">
        <label className="text-sm text-gray-500 dark:text-gray-400">
          Month
        </label>
        <select
          onChange={(e) => setMonth(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#0F172A] text-gray-800 dark:text-white"
        >
          <option value="">All Months</option>
          {[...Array(12)].map((_, i) => (
            <option key={i} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col w-full">
        <label className="text-sm text-gray-500 dark:text-gray-400">
          Year
        </label>
        <select
          onChange={(e) => setYear(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#0F172A] text-gray-800 dark:text-white"
        >
          <option value="">All Years</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
        </select>
      </div>

    </div>
  </section>


  {/* 🔹 SUMMARY CARDS */}
  <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

    <div className="p-5 rounded-xl bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 shadow-sm">
      <p className="text-sm text-gray-500">Income</p>
      <p className="text-2xl font-bold text-green-500">₹{income}</p>
    </div>

    <div className="p-5 rounded-xl bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 shadow-sm">
      <p className="text-sm text-gray-500">Expense</p>
      <p className="text-2xl font-bold text-red-500">₹{expense}</p>
    </div>

    <div className="p-5 rounded-xl bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 shadow-sm">
      <p className="text-sm text-gray-500">Balance</p>
      <p className="text-2xl font-bold text-indigo-500">
        ₹{dashboardData.netBalance}
      </p>
    </div>

  </section>


  {/* 🔹 PIE + BAR */}
  <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">

    {/* Pie */}
    <div className="p-4 rounded-xl bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 shadow-sm">
      <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
        Income vs Expense
      </h2>

      <div className="w-full h-[250px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
              <Cell fill="#22c55e" />
              <Cell fill="#ef4444" />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>


    {/* Bar */}
    <div className="lg:col-span-2 p-4 rounded-xl bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 shadow-sm">
      <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
        Spending by Category
      </h2>

      <div className="w-full h-[300px]">
        <ResponsiveContainer>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

  </section>


  {/* 🔹 LINE CHART */}
  <section className="p-4 rounded-xl bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 shadow-sm">
    <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
      Financial Journey Over Time
    </h2>

    <div className="w-full h-[300px]">
      <ResponsiveContainer>
        <LineChart data={trendData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="income" stroke="#22c55e" />
          <Line type="monotone" dataKey="expense" stroke="#ef4444" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </section>


  {/* 🔹 RECENT */}
  <section className="p-4 rounded-xl bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 shadow-sm">
    <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
      Recent Activity
    </h2>

    <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
      {(dashboardData.recentTransactions || []).map(item => (
        <div key={item._id} className="py-3 flex justify-between items-center">

          <div>
            <p className="font-medium text-gray-800 dark:text-white">
              {item.category}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(item.date).toLocaleDateString()}
            </p>
          </div>

          <p className={`font-bold ${
            item.type === "income" ? "text-green-500" : "text-red-500"
          }`}>
            ₹{item.amount}
          </p>

        </div>
      ))}
    </div>
  </section>

</main>
  )
}

export default Dashboard