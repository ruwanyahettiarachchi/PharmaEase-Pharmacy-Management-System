const mongoose = require("mongoose")

const medicineSchema = mongoose.Schema({
    m_name:String,
    description:String,
    price:Number,
    stock:Number,
    supplier: String
        
})

const medicineModel = mongoose.model("medicine", medicineSchema)
module.exports = medicineModel;