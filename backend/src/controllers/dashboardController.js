// Provide summary/analytics data
import transactModel from "../models/transaction.js";
import mongoose from "mongoose";

//Viewer Can view dashboard BUT only their own data i.e their total income,their expenses,their categories

//Analyst Can view dashboard Can see ALL users’ aggregated data

//Admin Full access Same as analyst


export const getDashboardSummary=async (request,response)=>{
    //returns multiple insights

    //Total income -> sum of all transaction records where type=="income"
    //Total expenses -> sum of all transaction records where type=="expense"
    //Net balance -> income - expense
    //Category wise totals -> group by category
    //Recent activity -> latest tranasactions
    //Monthly or weekly trends

    try {
        const baseMatch = {
            userId: new mongoose.Types.ObjectId(request.user.userId)
        };

        let filteredMatch = { ...baseMatch };

        if (request.query.year) {
            const year = parseInt(request.query.year);

            let start = new Date(year, 0, 1);
            let end = new Date(year, 11, 31, 23, 59, 59);

            if (request.query.month) {
                const month = parseInt(request.query.month);
                start = new Date(year, month - 1, 1);
                end = new Date(year, month, 0, 23, 59, 59);
            }

            filteredMatch.date = { $gte: start, $lte: end };
        }

        //total income
        const income = await transactModel.aggregate([
            { $match: { ...filteredMatch, type: "income" } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        //total expense
        const expense = await transactModel.aggregate([
            { $match: { ...filteredMatch, type: "expense" } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        //category breakdown
        const categoryBreakdown = await transactModel.aggregate([
            { $match: filteredMatch },
            {
                $group: {
                _id: "$category",
                total: { $sum: "$amount" }
                }
            }
        ]);

        //recent transactions
        const recent = await transactModel.find(baseMatch).sort({ date: -1 }).limit(5);  //give latest 5 transactions

        //monthly trends
        const monthlyTrends = await transactModel.aggregate([
            { $match: baseMatch },
            {
                $group: {
                _id: {
                    year: { $year: "$date" },
                    month: { $month: "$date" }
                },
                income: {
                    $sum: {
                    $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
                    }
                },
                expense: {
                    $sum: {
                    $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
                    }
                }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            }
        ]);

        //net balance
        const totalIncome = income[0]?.total || 0;
        const totalExpense = expense[0]?.total || 0;

        const netBalance = totalIncome - totalExpense;

        response.status(200).send({
            message: "Dashboard summary fetched successfully",
            success: true,
            result: {
                totalIncome,
                totalExpense,
                netBalance,
                categoryBreakdown,
                monthlyTrends,
                recentTransactions: recent
            }
        });

    } 
    catch (error) {
        console.log(error.message)
        response.status(500).send({"message":"Something went wrong","success":false,"result":null})
    }

}

