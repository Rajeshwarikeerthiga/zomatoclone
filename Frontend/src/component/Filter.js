import React, { Component, useLayoutEffect } from "react";
// import "./Styles/Filter.css";
import queryString from 'query-string';
import axios from 'axios';
import Header from "./Header";
import Logo from "./logo";

// Declare the filter component.
class Filter extends Component {
    constructor() {
        super();
        this.state = {
            page: "",
            restaurants: [],          // Whole restaurants data.
            option: "",              // This shows heading based on what mealtypes we clicks. (ex) Breakfast places in delhi.
            currentPage: 1,           // This is current page which default value is 1.
            itemsPerPage: 2,         // This how many restaurant data will show per page. ideally 2.
            mealtype_id: undefined,  // This is mealtype_id
            location_id: undefined,  // This is location_id
            sort: 1,                 // This is sort value. if (1) = Ascending order , (-1) = Descending order.
            cuisine_id: [],          // This is cuisine_id. Initially empty array.
            lcost: undefined,        // This is minimum price for restaurant.
            hcost: undefined,        // This is maximum price for restaurant.
            location: []             // This is locations dropdown data.
        }
    }

    componentDidMount = async () => {
        // Get the values from query string which is coming from homepage.
        const qs = queryString.parse(this.props.location.search);
        const location = qs.location;
        const mealtype = Number(qs.mealtype);
        const mealtype_name = qs.mealtype_name;

        this.setState({ option: mealtype_name });
        // Declare the locations and mealtypes value in payload.
        const inputObj = {
            location_id: location,
            mealtype_id: mealtype
        }

        // Making api call to fetch the restaurant data based on payload.
        const restaurants = await axios({
            method: 'POST',
            url: 'http://localhost:8900/filter',
            headers: { 'Content-Type': 'application/json' },
            data: inputObj
        })
        // once get the value then update the state variable.
        this.setState({ restaurants: restaurants.data, mealtype_id: mealtype, location_id: location });

        // Making api call for locations data to showing drop-downs filters.
        const locationDD = await axios({
            method: 'GET',
            url: 'http://localhost:8900/location',
            headers: { 'Content-Type': 'application/json' }
        });
        // Update the location variable in state.
        this.setState({ location: locationDD.data });
    }

    // User clicks the sort button this function will execute.
    handleSort = async (sort) => {
        const { mealtype_id, location_id, lcost, hcost, cuisine_id } = this.state;
        // loading the values in payload
        const inputObj = {
            sort: sort,
            mealtype_id: mealtype_id,
            location_id: location_id,
            lcost: lcost,
            hcost: hcost,
            // if cuisine_id is empty array, this function willn't work so set the value as undefined.
            cuisine_id: cuisine_id && cuisine_id.length > 0 ? cuisine_id : undefined
        }
        // Making api call to sorting data.
        const restaurants = await axios({
            method: 'POST',
            url: 'http://localhost:8900/filter',
            headers: { 'Content-Type': 'application/json' },
            data: inputObj
        })
        // Once get the data, then update restaurant, sort and page number as 1.
        this.setState({ restaurants: restaurants.data, sort, currentPage: 1 })
    }

    // User clicks the cost  button this function will execute.
    handleCost = async (lcost, hcost) => {
        const { sort, mealtype_id, location_id, cuisine_id } = this.state;
        // loading all values in payload.
        const inputObj = {
            sort: sort,
            mealtype_id: mealtype_id,
            location_id: location_id,
            lcost: lcost,
            hcost: hcost,
            // if cuisine_id is empty array, this function willn't work so set the value as undefined.
            cuisine_id: cuisine_id && cuisine_id.length > 0 ? cuisine_id : undefined

        }
        // making api call to get expected cost based restaurant data.
        const restaurants = await axios({
            method: 'POST',
            url: 'http://localhost:8900/filter',
            headers: { 'Content-Type': 'application/json' },
            data: inputObj
        });
        // Once get the data, then update restaurant, lcost, hcost and page number in 1.
        this.setState({ restaurants: restaurants.data, lcost, hcost, currentPage: 1 });
    }

    // User clicks locations drop down menu this will execute.
    handleLocationChange = async (event) => {
        // Getting the location id from drop-down.
        const location_id = event.target.value;
        const { sort, mealtype_id, lcost, hcost, cuisine_id } = this.state;

        // Loading the all values in payload.
        const inputObj = {
            sort: sort,
            mealtype_id: mealtype_id,
            location_id: location_id === "Select Locations" ? undefined : location_id,
            lcost: lcost,
            hcost: hcost,
            // if cuisine_id is empty array, this function willn't work so set the value as undefined.
            cuisine_id: cuisine_id && cuisine_id.length > 0 ? cuisine_id : undefined
        }
        // Making the api call to get location based restaurant data.
        const restaurants = await axios({
            method: 'POST',
            url: 'http://localhost:8900/filter',
            headers: { 'Content-Type': 'application/json' },
            data: inputObj
        });
        // Once get the data, then update restaurant, location id and page number in 1.
        this.setState({ restaurants: restaurants.data, location_id, currentPage: 1 });
    }

    // User clicks on cuisine check-box this function will execute.
    handleCuisineChange = async (value) => {
        let tempArray = this.state.cuisine_id.slice();
        if (tempArray.indexOf(value) === -1) {
            tempArray.push(value);
        } else {
            tempArray.splice(tempArray.indexOf(value), 1);
        }

        const { sort, mealtype_id, location_id, lcost, hcost } = this.state;
        // Loading the all values in payload.
        const inputObj = {
            sort: sort,
            mealtype_id: mealtype_id,
            location_id: location_id,
            lcost: lcost,
            hcost: hcost,
            cuisine_id: tempArray.length > 0 ? tempArray : undefined
        }
        // Making the api call to fetch the cuisine based restaurant data.
        const restaurants = await axios({
            method: 'POST',
            url: 'http://localhost:8900/filter',
            headers: { 'Content-Type': 'application/json' },
            data: inputObj
        });
        // Once get the data, then update restaurant, cuisne id and page number in 1.
        this.setState({ restaurants: restaurants.data, cuisine_id: tempArray, currentPage: 1 });
    }

    // User clicks the pagenumber will upadate current page number in state.
    handleClickPage = (event) => {
        this.setState({ currentPage: Number(event.target.id) });
    }

    handlePrev = () => {
        this.setState({ currentPage: this.state.currentPage - 1 });
    }

    handleNext = () => {
        this.setState({ currentPage: this.state.currentPage + 1 });
    }

    handleViewRestaurant = (id) => {
        this.props.history.push(`/detail?restaurant=${id}`);
    }

    render() {
        const { restaurants, currentPage, itemsPerPage } = this.state;

        // This is the pagination logic to showing restaurant data per page.
        const lastIndex = currentPage * itemsPerPage;
        const firstIndex = lastIndex - itemsPerPage;
        const currentrestaurants = restaurants.slice(firstIndex, lastIndex);
        

        // iterating restaurant data for showing to users with css styling.
        let result = currentrestaurants && currentrestaurants.length > 0 ? currentrestaurants.map((item) => {
            return <div className="col-sm-12" onClick={() => this.handleViewRestaurant(item._id)} style={{ cursor: 'pointer' }}>
                <div className="restaurant-box" style={{ boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)", margin: "0 0 20px 0" }}>
                    <div style={{ display: "inline-block" }}>
                        <img className="filter-image" src={item.image} width="120" height="120" alt="images not found"
                            style={{ borderRadius: "25px", margin: "20px" }} />
                    </div>
                    <div style={{ display: "inline-block", verticalAlign: 'top', margin: '3rem 0 0 1rem' }} className="res-details">
                        <h2 style={{ fontWeight: "600", color: '#192f60' }}> {item.name} </h2>
                        <h4 style={{ fontWeight: "600", marginTop: "10px", color: '#192f60' }}>{item.locality}</h4>
                        <h5 style={{ width: "25rem", marginTop: "10px", color: '#636f88' }}>{item.address}</h5>
                    </div><br /><br />
                    <hr />
                    <div style={{ display: "inline-block", margin: "30px" }}>
                        <h4 className="h4-tag" style={{ color: '#636f88' }}>CUISINES:</h4>
                        <h4 className="h4-tag" style={{ color: '#636f88' }}>COST FOR TWO:</h4>
                    </div>
                    <div style={{ display: "inline-block", verticalAlign: "top", marginTop: "29px" }}>
                        <h4 className="h4-tag" style={{ color: '#192f60' }}>{item.cuisine_id.map((cuis) => cuis.name + " ")}</h4>
                        <h4 className="h4-tag" style={{ color: '#192f60' }}>₹{item.cost}</h4>
                    </div>
                </div>
            </div>
        }) : <div style={{ fontSize: '30px', marginLeft: 'auto', marginRight: 'auto' }}>No results found ...</div>

        // Calculating the total page numbers and push into new array.
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(restaurants.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }
        // iterating the page numbers and showing in display with styling.

        // This is the logic for prev button in pagination
        let prevButton;
        if (pageNumbers.length === 1) {
            prevButton = <li style={{ display: 'none' }}><a href="#" className="page-link" >Prev</a></li>
        }
        if (pageNumbers.length > 1) {
            prevButton = <li className="page-list"><a href="#" className="page-numbers" onClick={this.handlePrev}>{"<"}</a></li>
        }
        if (currentPage === 1 && pageNumbers.length > 1) {
            prevButton = <li className="page-list disabled"><a className="page-numbers" >{"<"}</a></li>
        }
        // This is the logic for next button in pagination
        let nextButton;
        if (pageNumbers.length === 1) {
            nextButton = <li style={{ display: 'none' }}><a href="#" className="page-link" >Next</a></li>
        }
        if (pageNumbers.length > 1) {
            nextButton = <li className="page-list"><a href="#" className="page-numbers" onClick={this.handleNext}>{">"}</a></li>
        }
        if (currentPage === pageNumbers.length && pageNumbers.length > 1) {
            nextButton = <li className="page-list disabled"><a className="page-numbers">{">"}</a></li>
        }
        // Rendering page numbers
        let renderPageNumbers = pageNumbers.map(number => {
            return (
                <li key={number} className="page-list">
                    <a className="page-numbers" style={currentPage === number ? { background: '#192f60', color: '#fff' } : {}} href="#" id={number} onClick={this.handleClickPage}>{number}</a>
                </li>
            )
        })

        
        return (
            <React.Fragment>
                 <div  style={{backgroundColor:"red"}}>
        <Logo/>
        <Header />
    </div>
                {/* This is for navigation bar */}
                <div className="container" style={{ marginTop: "2%" }}>
               
                    <h1 className="filter-heading" style={{ fontWeight: "bold", fontSize: "36px", margin: '0 0 20px 0', color: '#192f60' }}>{this.state.option} Places in New Delhi</h1>

                    <div className="row">

                        <div className="col-md-4">
                            <div className="panel panel-default" style={{ padding: '15px', marginBottom: '0px' }}>
                                <h4 style={{ fontWeight: "600", display: "inline-block" }}>Filters / Sort</h4>
                                <div style={{ display: "inline-block", verticalAlign: "top" }}
                                    className="glyphicon glyphicon-chevron-down toggle-div" data-toggle="collapse" data-target="#demo">
                                </div>
                            </div>

                            {/* This is the right side block which contains all filter options */}
                            <div style={{ boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)", height: "630px", padding: '17px 25px 31px 26px', marginBottom: "100px", background: "#fff" }} id="demo" className="collapse show" >
                                <h4 style={{ fontWeight: "600", fontSize: '18px', marginBottom: '20px' }}>Filters</h4>
                                <div style={{ fontSize: '14px' }}>Select location</div>

                                {/* This is for locations drop-down menu */}
                                <div className="form-group">
                                    <select className="drop-down" onChange={this.handleLocationChange}>
                                        <option selected>Selcect Locations</option>
                                        {/* Iterating locations data to showing drop-down menu */}
                                        {this.state.location.map((item) => {
                                            return <option value={item.location_id}>{item.name}</option>
                                        })}
                                    </select>
                                </div>

                                {/* This is a cuisine checkbox */}
                                <div style={{ fontWeight: "normal", fontSize: '14px', marginTop: '30px', color: '#192f60' }}>Cuisine</div>
                                <div className="checkbox">
                                    <label><input type="checkbox" onChange={() => this.handleCuisineChange(1)} />North-Indian</label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" onChange={() => this.handleCuisineChange(2)} />South-Indian</label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" onChange={() => this.handleCuisineChange(3)} />Chinese</label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" onChange={() => this.handleCuisineChange(4)} />Fast Food</label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" onChange={() => this.handleCuisineChange(5)} />Street Food</label>
                                </div>

                                {/* This is for cost for tow radio box. */}
                                <div style={{ fontWeight: "normal", fontSize: '14px', marginTop: '30px', color: '#192f60' }}>Cost for two</div>
                                <div className="radio">
                                    <label><input type="radio" name="cost" onChange={() => this.handleCost(1, 500)} />Less than ₹500</label>
                                </div>
                                <div className="radio">
                                    <label><input type="radio" name="cost" onChange={() => this.handleCost(500, 1000)} />₹500 to ₹1000</label>
                                </div>
                                <div className="radio">
                                    <label><input type="radio" name="cost" onChange={() => this.handleCost(1000, 1500)} />₹1000 to ₹1500</label>
                                </div>
                                <div className="radio">
                                    <label><input type="radio" name="cost" onChange={() => this.handleCost(1500, 2000)} />₹1500 to ₹2000</label>
                                </div>
                                <div className="radio">
                                    <label><input type="radio" name="cost" onChange={() => this.handleCost(2000, 2500)} />₹2000+</label>
                                </div><br />

                                {/* This is for sort options. */}
                                <div style={{ fontWeight: "600", fontSize: '14px', marginTop: '10px', color: '#192f60' }}>Sort</div>
                                <div className="radio">
                                    <label><input type="radio" name="sort" onChange={() => this.handleSort(1)} />Price low to high</label>
                                </div>
                                <div className="radio">
                                    <label><input type="radio" name="sort" onChange={() => this.handleSort(-1)} />Price high to low</label>
                                </div><br />
                            </div>
                        </div>

                        <div className="col-md-8">
                            <div className="row">
                                {/* Rendering restaurant data */}
                                {result}
                                <div className="col-sm-12" >
                                    <ul className="pagination pagination-md page">
                                        {prevButton}
                                        {renderPageNumbers}
                                        {nextButton}
                                    </ul>
                                </div>
                            </div>
                                {/* {restaurants.length > 0 ?
                                <div>
                                    <span>&laquo;</span>
                                    {pageNumbers.map(pageNumbers=>{
                                        return <span>{pageNumbers}</span>
                                    })}
                                    <span>&raquo;</span>
                                </div> : null} */}




                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
// Exporting to router component.
export default Filter;










// import React from 'react';
// import '../component/style/filter.css';
// // import image1 from'../Assets/images1.jpg';
// import Header from "./Header";
// import axios from "axios";
// import queryString from "query-string";
// import { withRouter } from "react-router-dom";

// class Filter extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             location: [],
//             restaurants: [],
//             meal_type: undefined,
//             location_id: undefined,
//             sort: 1,
//             cuisine_id: [],
//             lcost: undefined,
//             hcost: undefined,
//             // pagecount:[],
//             page: 1,
//             option: ""
//         }
//     }
//     // componentDidMount() {
//     //     const qs = queryString.parse(this.props.location.search);
//     //     const location = qs.location;
//     //     const mealtype = Number(mealtype);
//     //     const mealtype_name = qs.mealtype_name;
//     //     this.setState({ option: mealtype_name })
//     //     // const {location,mealtype} = qs;
//     //     const { lcost, hcost } = this.state;

//     //     const filterObj = {
//     //         location_id: location,
//     //         // mealtype: Number(mealtype) 
//     //         mealtype_id: mealtype,
//     //     }
//     //     axios({
//     //         method: "POST",
//     //         url: "http://localhost:8900/filter",
//     //         headers: { "Content-Type": "application/json" },
//     //         data: filterObj
//     //     })
//     //         .then(response => {
//     //             this.setState({ restaurants: response.data, mealtype_id: mealtype, location_id: location });
//     //         })
//     //         .catch();

//     //     axios({
//     //         method: "GET",
//     //         url: "http://localhost:8900/location",
//     //         headers: { "Content-Type": "application/json" },

//     //     })
//     //         .then(response => {
//     //             this.setState({ location: response.data, lcost, hcost });
//     //         })
//     //         .catch();

//     // }
//     componentDidMount = async () => {
//         // Get the values from query string which is coming from homepage.
//         const qs = queryString.parse(this.props.location.search);
//         const location = qs.location;
//         const mealtype = Number(qs.mealtype);
//         const mealtype_name = qs.mealtype_name;

//         this.setState({ option: mealtype_name });
//         // Declare the locations and mealtypes value in payload.
//         const inputObj = {
//             location_id: location,
//             mealtype_id: mealtype
//         }

//         // Making api call to fetch the restaurant data based on payload.
//         const restaurants = await axios({
//             method: 'POST',
//             url: 'http://localhost:8900/filter',
//             headers: { 'Content-Type': 'application/json' },
//             data: inputObj
//         })
//         // once get the value then update the state variable.
//         this.setState({ restaurants: restaurants.data, mealtype_id: mealtype, location_id: location });

//         // Making api call for locations data to showing drop-downs filters.
//         const locationDD = await axios({
//             method: 'GET',
//             url: 'http://localhost:8900/location',
//             headers: { 'Content-Type': 'application/json' }
//         });
//         // Update the location variable in state.
//         this.setState({ location: locationDD.data });
//     }
//     handleLocationChange = (event) => {
//         const location = event.target.value;
//         const { mealtype, cuisine_id, lcost, hcost, sort, page } = this.state;
//         // loading all values in payload.
//         const filterObj = {

//             mealtype: Number(mealtype),
//             sort,
//             location,
//             lcost,
//             hcost,
//             page,
//             // if cuisine_id is empty array, this function willn't work so set the value as undefined.
//             cuisine_id: cuisine_id && cuisine_id.length > 0 ? cuisine_id : undefined

//         }
//     }
//     handleCuisineChange = (cuisine_id) => {
//         const { sort, cuisine, mealtype, location, lcost, hcost, page } = this.state;
//         const index = cuisine.indexOf(cuisine_id)
//         if (index === -1) {
//             cuisine.push(cuisine_id);
//         } else {
//             cuisine.splice(index, 1);
//         }


//         // Loading the all values in payload.
//         const filterObj = {
//             mealtype: Number(mealtype),
//             sort,
//             location,
//             lcost,
//             hcost,
//             page,
//             cuisine_id: cuisine.length > 0 ? cuisine : undefined
//         }
//     }

//     render() {
//         const { location, restaurants, pagecount } = this.state;
//         return (
//             <div className="fluid">

//                 <div style={{ backgroundColor: "red" }}>

//                     <Header />
//                 </div>
//                 <h2 id="head1">Breakfast Places in Mumbai</h2>
//                 <div id="container1">
//                     <div id="filter">
//                         <h3>Filters</h3>
//                         <h2 className="sort"> / sort</h2>
//                         <h4>Select Location</h4>
//                         <form>
//                             <select className="location" onChange={this.handleLocationChange}>
//                                 <option value="0">select</option>
//                                 {location.map((item) => {
//                                     return <option value={item.location_id}>{`${item.name},${item.city}`}</option>
//                                 })}
//                             </select><br />

//                             <p><b>Cuisine</b></p>
//                             <input type="checkbox" onChange={() => this.handleCuisineChange(1)} />North Indian<br />
//                             <input type="checkbox" onChange={() => this.handleCuisineChange(2)} />South Indian<br />
//                             <input type="checkbox" onChange={() => this.handleCuisineChange(3)} />Chinese<br />
//                             <input type="checkbox" onChange={() => this.handleCuisineChange(4)} />Fast Food<br />
//                             <input type="checkbox" onChange={() => this.handleCuisineChange(5)} />Street Food
//                             <p><b>Cost for two</b></p>
//                             <input type="radio" name="cost" />Less than &#8377;500<br />
//                             <input type="radio" name="cost" /> &#8377;500 to  &#8377;1000<br />
//                             <input type="radio" name="cost" /> &#8377;1000 to  &#8377;1500<br />
//                             <input type="radio" name="cost" /> &#8377;1500 to  &#8377;2000<br />
//                             <input type="radio" name="cost" /> &#8377;2000 +<br />
//                             <p><b>Sort</b></p>
//                             <input type="radio" name="price" />Price High to Low<br />
//                             <input type="radio" name="price" />Price Low to High<br />
//                         </form>

//                     </div>

//                     <div id="container2">
//                         {restaurants.length > 0 ? restaurants.map((item) => {
//                             return <div className="box">
//                                 <img src={`./${item.image}`} alt="" className="filterimg" />
//                                 <div className="inside">
//                                     <h4>{item.name}</h4>
//                                     <h5>{item.locality}</h5>
//                                     <p className="p2">{item.city_name}</p>
//                                 </div>
//                                 <hr />
//                                 <p>CUISINES     :{item.cuisine.map(cuisineItem => `${cuisineItem} `)}</p>
//                                 <p>COST FOR TWO:<b>&#8377;{item.cost}</b></p>
//                             </div>
//                         }) : <div className="record">No Records found ....</div>}
//                         {restaurants.length > 0 ?
//                             <div id="button">
//                                 <button className="btn2">&laquo;</button>
//                                 <button className="btn2">1</button>
//                                 <button className="btn2">2</button>
//                                 <button className="btn2">3</button>
//                                 <button className="btn2">4</button>
//                                 <button className="btn2">5</button>
//                                 <button className="btn2">&raquo;</button>
//                             </div> : null
//                         }
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// export default withRouter(Filter);