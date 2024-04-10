import React from "react";
import "../component/style/style.css";
import axios from "axios";
import Wallpaper from "./wallpaper";
import Quicksearch from "./Quicksearch";
import Header from "./Header";


class Home extends React.Component{
    constructor(){
        super()
        this.state={
            locations:[],
            mealtype:[]
        }
}
componentDidMount(){
    sessionStorage.clear();
    axios({
        method:"GET",
        url:"http://localhost:8900/location",
        headers:{"Content-Type":"application/json"}
    })
    .then(response=>{
        this.setState({locations:response.data});
    })
    .catch();
    axios({
        method:"GET",
        url:"http://localhost:8900/mealtype",
        headers:{"Content-Type":"application/json"}
    })
    .then(response=>{
        this.setState({mealtype:response.data});
    })
    .catch(err=>console.log(err));
}
render(){
  const {locations,mealtype}=this.state;
    return(
        <div>
            <div style={{backgroundColor:"black"}}>
                <Header/>
                </div>
            <Wallpaper LocationData={locations}/>
            <Quicksearch quicksearchData={mealtype}/>
        </div>
    )
    }
}
export default Home;
