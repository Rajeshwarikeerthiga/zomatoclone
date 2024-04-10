import React from "react";
// import image from'../Assets';
import'../component/style/style.css';
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";



class Quicksearchitems extends React.Component{
    
        handleNavigate = (mealtype_id,name) => {
            const location_id=sessionStorage.getItem("location_id");
            if(location_id){
             this.props.history.push(`/filter?mealtype=${mealtype_id}&mealtype_name=${name}&location=${location_id}`)
           }else{
             this.props.history.push(`/filter?mealtype=${mealtype_id}&mealtype_name=${name}`)
           }
         
         
        }
       
    render(){
        const{name,content,image,mealtype_id} = this.props.quicksearchitemData;
        return(
            <div>
        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4" onClick={()=>this.handleNavigate(mealtype_id,name)}>
      
      <div className="food"  >
             <img className="menu" src={`./${image}`} alt="image not found"/>
              <h4 className="head">{name}</h4>
              <p className="para1">{content}</p>
         </div>
         </div>
         </div>
        
         
                 
        )
    }
}
export default withRouter(Quicksearchitems)