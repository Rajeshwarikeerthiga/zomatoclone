import React from "react";
import Quicksearchitems from "./Quicksearchitems";
class Quicksearch extends React.Component{
    render(){
        const {quicksearchData}=this.props;
        return(
        
            <div className="container">
            <h2 className="text-h2">Quick searches</h2>
            <p className="paraa"> Discover restaurant by type of meal</p>
            <div className="row">
                    {quicksearchData.map((item)=>{
                     return <Quicksearchitems quicksearchitemData={item}/>
                    })}
                
                </div>
            </div>
        )
    }
}

export default Quicksearch