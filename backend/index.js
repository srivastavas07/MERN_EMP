import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import databaseConnection from "./config/database.js";
import adminRoutes from "./routes/adminRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
dotenv.config({
    path:'.env'
})
databaseConnection();
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(cookieParser());
app.use('/api/v1/employees',employeeRoutes);
app.use('/api/v1/admin',adminRoutes);
app.get('/',(req,res)=>{
    res.send('Hello World');
})
app.listen(process.env.PORT || 8000,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});
export default app;
