const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const medicineRoutes = require("./routes/medicineRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");

const app=express();
app.use(cors());
app.use(express.json());

app.use("/", medicineRoutes);
app.use("/", supplierRoutes);
app.use("/", invoiceRoutes);


const PORT=process.env.PORT||8060











mongoose.connect("mongodb+srv://admin:admin1234@cluster0.tayveae.mongodb.net/pharmacy_db?retryWrites=true&w=majority").then(()=>{
    console.log(`server connection ${PORT} !`);
    app.listen(PORT,()=>console.log("server connection successful "))
}).catch((err)=>{
    console.log(err)
})