const mongoose = require("mongoose")

const supplierSchema = mongoose.Schema({
    name:String,
    email:String,
    contractInfo:String,

})

const supplierModel = mongoose.model("supplier", supplierSchema)
module.exports = supplierModel;