var list= require("../model/restaurants");

exports.getAllRestaurants=(req,res)=>{
    // var restaurent = list.find()
    // res.send(restaurent)
    list.find().then(result=>{
        res.status(200).json(result);
    }).catch(error=>{
        res.status(500).json({
            message:"Error in Database",
            error:error
        });
    });
}

exports.getAllRestaurantsById=(req,res)=>{
    list.findById(req.params.id).then(result1=>{
        res.status(200).json(result1);
    }).catch(error=>{
        res.status(500).json({
            message:"Error in Database",
            error:error
        });
    });
}

exports.getAllRestaurantsByCity=(req,res)=>{
    list.find({location_id:req.params.id}).then(result2=>{
        res.status(200).json(result2);
    }).catch(error=>{
        res.status(500).json({
            message:"Error in Database",
            error:error
        });
    });
}
exports.filter = async (req, res) => {
    const mealtype_id = req.body.mealtype_id;
    const location_id = req.body.location_id;
    const cuisine_id = req.body.cuisine_id;
    const hcost = req.body.hcost;
    const lcost = req.body.lcost;
    const sort = req.body.sort ? req.body.sort : 1;
    const page = req.body.page ? req.body.page : 1;
   
    let itemPerPage = 2;
    let startIndex = (page * itemPerPage) - itemPerPage;
    let endIndex = (page * itemPerPage);
    
    

    let payload = {};

    if(mealtype_id){
        payload = {mealtype_id: {$elemMatch: { mealtype: mealtype_id}}};
    }
    if(mealtype_id && location_id){
        payload = {
            mealtype_id: {$elemMatch: { mealtype: mealtype_id}},
            location_id : location_id
        }
    }
    if(mealtype_id && cuisine_id ){
        payload = {
            mealtype_id: {$elemMatch: { mealtype: mealtype_id}},
            cuisine_id: {$elemMatch: { cuisine: cuisine_id}},
        }
    }
    if(mealtype_id && hcost && lcost){
        payload = {
            mealtype_id: {$elemMatch: { mealtype: mealtype_id}},
            cost : {$lte: hcost, $gte : lcost}
        }
    }
    if(mealtype_id && cuisine_id && hcost && lcost){
        payload = {
            mealtype_id: {$elemMatch: { mealtype: mealtype_id}},
            cost : {$lte: hcost, $gte : lcost},
            cuisine_id: {$elemMatch: { cuisine: cuisine_id}},
        }
    }
    if(mealtype_id && location_id && cuisine_id){
        payload = {
            mealtype_id: {$elemMatch: { mealtype: mealtype_id}},
            location_id : location_id,
            cuisine_id: {$elemMatch: { cuisine: cuisine_id}}
        }
    }
    if(mealtype_id && location_id && hcost && lcost){
        payload = {
            mealtype_id: {$elemMatch: { mealtype: mealtype_id}},
            location_id : location_id,
            cost : {$lte: hcost, $gte : lcost}
        }
    }
    if(mealtype_id && location_id && cuisine_id && hcost && lcost){
        payload = {
            mealtype_id: {$elemMatch: { mealtype: mealtype_id}},
            location_id : location_id,
            cost : {$lte: hcost, $gte : lcost},
            cuisine_id: {$elemMatch: { cuisine: cuisine_id}}
        }
    }

    let filterData = await list.find(payload).sort({cost : sort});
    let arr = [];
    for (let i = 1; i <= Math.ceil(res.length / itemPerPage); i++){
        arr.push(i);
    }
        try{
        res.status(200).json(filterData
            );
    }catch(err){
        res.status(500).send(err);
    }
}

// exports.getAllRestaurants=(req,res)=>{
//     const city=req.params.city;
//     const city_id=req.params.city_id;
//     list.find({city:Delhi,city_id:1
//     })
//     .then(result=>{
//         res.status(200).json({
//          message:`Restaurants fetched for city ${Delhi} & city-id ${1}`,
//          restaurants:result   
//         });
//     })
//     .catch(error=>{
//         res.status(500).json({
//             message:"Error in Database",
//             error:error
//         });
//     });
// };

