var list1= require("../model/mealtypes");
exports.getAllMealtypes=(req,res)=>{
    // var mealtype = list1.find()
    // res.send(mealtype)
    list1.find().then(result=>{
        res.status(200).json(result);
    }).catch(error=>{
        res.status(500).json({
            message:"Error in Database",
            error:error
        });
    });
}