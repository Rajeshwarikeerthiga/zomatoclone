const mongoose = require("mongoose")
const schema = mongoose.Schema
const LocationSchema = new schema({
    name: {
        type: String,
        required: true,

    },
    city: {
        type: String,
        required: true,

    },
    location_id: {
        type: Number,
        required: true,

    },
    city_id: {
        type: Number,
        required: true,

    },
    country_name: {
        type: String,
        required: true,

    },
})
    
    
module.exports = mongoose.model("location", LocationSchema);