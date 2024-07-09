const express = require("express")

const supplierModel = require("../models/supplierModel");
const router = express.Router();

router.post("/create_supplier",async(req,res)=>{
    const data=new supplierModel(req.body);
    await data.save();
    res.send({success:true,message:"supplier added"})
})

router.get("/supplier",async(req,res)=>{
    const data= await supplierModel.find({})
  
    res.json({success:true,data:data})
})


router.put("/update_supplier",async(req,res)=>{
    const {id,...rest}=req.body
    const data=await supplierModel.updateOne({_id:id},rest)
    res.json({success:true,message:"supplier updated successfully",data:data})


})

router.delete("/delete_supplier/:id",async(req,res)=>{
    const id=req.params.id
    const data=await supplierModel.deleteOne({_id:id})
    res.json({success:true,messsage:"supplier deleted"})
})


router.get("/supplier/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const supplier = await supplierModel.findById(id);

        if (!supplier) {
            return res.status(404).send({ success: false, message: "supplier not found" });
        }

        res.send({ success: true, message: "supplier fetched successfully", data: user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
    
});


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
            res.json({success:true,message:"count fetched successfully",data:data})
    }

})
module.exports = router;