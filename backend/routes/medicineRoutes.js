const express = require("express")

const medicineModel = require("../models/medicineModel");
const router = express.Router();

router.post("/create_medicine",async(req,res)=>{
    const data=new medicineModel(req.body);
    await data.save();
    res.send({success:true,message:"medicine added"})
})

router.get("/medicine",async(req,res)=>{
    const data=await medicineModel.find({})
    res.json({success:true,message:"",data:data})
})

router.put("/update_medicine",async(req,res)=>{
    const {id,...rest}=req.body
    const data=await medicineModel.updateOne({_id:id},rest)
    res.json({success:true,message:"medicine updated successfully",data:data})


})

router.delete("/delete_medicine/:id",async(req,res)=>{
    const id=req.params.id
    const data=await medicineModel.deleteOne({_id:id})
    res.json({success:true,messsage:"medicine deleted"})
})


router.get("/medicine/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const medicine = await medicineModel.findById(id);

        if (!medicine) {
            return res.status(404).send({ success: false, message: "medicine not found" });
        }

        res.send({ success: true, message: "medicine fetched successfully", data: user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});


//get count in medicine table
router.get("/count_medicine",async(req,res)=>{
    try{
        const medicines =await medicineModel.find({});

        return res.status(200).json({
            count:medicines.length,
            data:medicines
        })

    }catch(err){
            console.log(err.message);
            res.json({success:true,message:"count fetched successfully",data:data})
    }

})
module.exports = router;