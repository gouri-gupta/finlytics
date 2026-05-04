//deals with How app is built

import express from 'express'
import transactRoute from './routes/transactionRoute.js'

import authRoute from './routes/authRoute.js'
import dashboardRoute from './routes/dashboardRoute.js'
import errorMiddleware from './middleware/errormiddleware.js'
import cors from "cors";


//Express app setup
const app=express()

//Middlewares
const allowedOrigins = [
  "http://localhost:5173", // for local development
  "https://finlytics-lemon.vercel.app" // your deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json())


//Routes
//defined a basic route for testing 
app.get("/",(request,response)=>{
    response.status(200).send("Finlytics backend route testing!Running successfully")
})

app.use("/api/auth",authRoute)
app.use("/api/transactions",transactRoute)
app.use("/api/dashboard",dashboardRoute)

//error handling middleware
app.use(errorMiddleware)

export default app;


