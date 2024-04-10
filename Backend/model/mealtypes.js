const mongoose = require("mongoose")
const schema = mongoose.Schema
const MealtypesSchema = new schema({
    id: {
        type: String,
        required: true,

    },
    name: {
        type: String,
        required: true,

    },
    content: {
        type: String,
        required: true,

    },
    image: {
        type: String,
        required: true,

    },
  mealtype_id: {
        type: Number,
        required: true,

    },
   
})
    
module.exports = mongoose.model("mealtypes", MealtypesSchema);