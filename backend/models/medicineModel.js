const mongoose = require("mongoose")

const medicineSchema = mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    stock:Number,
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
      },
})

const medicineModel = mongoose.model("medicine", medicineSchema)
module.exports = medicineModel;