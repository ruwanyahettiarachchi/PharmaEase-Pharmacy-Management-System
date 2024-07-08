const express = require("express")

const invoiceModel = require("../models/invoiceModel");
const medicineModel = require("../models/medicineModel");
const supplierModel = require("../models/supplierModel");
const router = express.Router();



//get count in suppliers table
router.get("/count_supplier",async(req,res)=>{
    try{
        const suppliers=await supplierModel.find({});

        return res.status(200).json({
            count:suppliers.length,
            data:suppliers
        })

    }catch(err){
            console.log(err.message);
            res.json({success:true,message:"count successfully",data:data})
    }

})

//get count in medicine table
router.get("/count_medicine",async(req,res)=>{
    try{
        const medicines=await medicineModel.find({});

        return res.status(200).json({
            count:medicines.length,
            data:medicines
        })

    }catch(err){
            console.log(err.message);
            res.json({success:true,message:"count successfully",data:data})
    }

})

//get count in invoice table
router.get("/count_invoice",async(req,res)=>{
    try{
        const invoices=await invoiceModel.find({});

        return res.status(200).json({
            count:invoices.length,
            data:invoices
        })

    }catch(err){
            console.log(err.message);
            res.json({success:true,message:"count successfully",data:data})
    }

})




module.exports = router;