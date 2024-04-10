var express= require("express");
var router= express.Router();
var cont1= require("../controller/restaurants");
var cont2=require("../controller/mealtypes");
var cont3=require("../controller/location");
var cont4=require("../controller/MenuitemsController");
router.get("/restaurants",cont1.getAllRestaurants);
router.get("/restaurants/:id",cont1.getAllRestaurantsById);
router.get("/location/:id",cont1.getAllRestaurantsByCity);
router.post("/filter",cont1.filter);
router.get("/menuitems/:id",cont4.getMenuItemsByRestaurant);


router.get("/mealtype",cont2.getAllMealtypes);
router.get("/location",cont3.getAlllocation);
module.exports=router;