const mongoose = require("mongoose")

const invoiceSchema = mongoose.Schema({
    customerName:String,
    customerEmail:String,
    medicines: [{
        medicineId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Medicine',
          required: true
        },
        quantity: Number,
        price: Number,
      }],
      total:Number,

})

const invoiceModel = mongoose.model("invoice", invoiceSchema)
module.exports = invoiceModel;