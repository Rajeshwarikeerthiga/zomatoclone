var express= require("express");
var app=express();
var cors= require("cors");
app.use(cors())
var port=8900;
app.use(express.json())
var one=require("./view/view");
app.post("/PostRestaurant",(req,res)=>{
    res.send({
        "Message":"Data posted successfully"
    });
})
app.post("/PostMealtype",(req,res)=>{
    res.send({
        "Message":"Data posted successfully"
    });
})
app.post("/Postlocation",(req,res)=>{
    res.send({
        "Message":"Data posted successfully"
    });
})
app.use("/",one).listen(port,()=>console.log("server is running on port"+port));
const mongoose=require('mongoose');
mongoose.connect(
 "mongodb+srv://rajeshwarikeerthiga:kanishka@cluster0.0rb2stv.mongodb.net/zomato?retryWrites=true&w=majority&appName=Cluster0",
 {
    useNewurlparser:true,
    useunifiedTopology:true
 }
).then(success=>{
    console.log("connected to MongoDB");
})