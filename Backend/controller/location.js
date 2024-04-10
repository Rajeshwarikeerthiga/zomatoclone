var list2= require("../model/location");
exports.getAlllocation=(req,res)=>{
    // var locations = list2.find()
    // res.send(locations)
    list2.find().then(result=>{
        res.status(200).json(result);
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

    let list = await list2.find(payload).sort({cost : sort});
    let arr = [];
    for (let i = 1; i <= Math.ceil(res.length / itemPerPage); i++){
        arr.push(i);
    }
        try{
        res.status(200).json(list
            
        //     {
        //         message : "Restaurents Fetched Successfully",
        //                  Page:arr,
        //         currentPage:page

        // }
            // {
            //     message : "Restaurents Fetched Successfully",
            //     restuarant : list,
            //     Page:arr,
            //     currentPage:page

            // }
            );
    }catch(err){
        res.status(500).send(err);
    }
}