const express = require("express")

const invoiceModel = require("../models/medicineModel");
const router = express.Router();

router.post("/create_invoice",async(req,res)=>{
    const data=new invoiceModel(req.body);
    await data.save();
    res.send({success:true,message:"invoice added"})
})

router.get("/invoice",async(req,res)=>{
    const data=await invoiceModel.find({})
    res.json({success:true,message:"",data:data})
})

router.put("/update_invoice",async(req,res)=>{
    const {id,...rest}=req.body
    const data=await invoiceModel.updateOne({_id:id},rest)
    res.json({success:true,message:"invoice updated successfully",data:data})


})

router.delete("/delete_invoice/:id",async(req,res)=>{
    const id=req.params.id
    const data=await invoiceModel.deleteOne({_id:id})
    res.json({success:true,messsage:"invoice deleted"})
})


router.get("/invoice/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const invoice = await invoiceModel.findById(id);

        if (!invoice) {
            return res.status(404).send({ success: false, message: "invoice not found" });
        }

        res.send({ success: true, message: "invoice fetched successfully", data: user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});


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
            res.json({success:true,message:"count fetched successfully",data:data})
    }

})
module.exports = router;