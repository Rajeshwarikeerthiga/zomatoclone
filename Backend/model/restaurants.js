const mongoose = require("mongoose")
const schema = mongoose.Schema

    

    const restaurantschema = new mongoose.Schema({
        
        name: {
            type: String,
            require: true
        },
        city_id: {
            type: Number,
            require: true
        },
        city: {
            type: String,
            require: true
        },
        location_id: {
            type: Number,
            require: true
        },
        locality  : {
            type : String,
            require : true
        },
        thumb : {
            type : String,
            require : true
        },
        aggregate_rating :{
            type : Number,
            require : true
        },
        
    rating_text :{
        type : String,
        require : true
    },
    
    min_price :{
        type: Number,
            require: true
    },
    contact_number :{
        type: Number,
            require: true
    },
    
    
    image :{
        type : String,
        require : true
    },
    mealtype_id : [{mealtype : Number, name : String}],
    
    cuisine_id : [{cuisine : Number, name : String}],
       
    })
    module.exports = mongoose.model("restaurants",restaurantschema)