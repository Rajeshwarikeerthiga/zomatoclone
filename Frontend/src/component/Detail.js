import React from "react";
import "../component/style/details.css";
import axios from "axios";
import queryString from "query-string";
import image6 from '../Assets/detail4.jpg';
import image7 from '../Assets/detail1.jpg';
import image8 from '../Assets/detail.jpg';
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Logo from "./logo";
import Header from "./Header";
import Modal from 'react-modal';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: "900px",
    height: "600px",
  },
};

class Detail extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurant: '',
      restaurant_id: undefined,
      menuitems: [],
      menuModalIsOpen: false,
      SubTotal: 0,
      galleryModalIsOpen: false,

    }
  }

  componentDidMount = async () => {
    const qs = queryString.parse(this.props.location.search)
    const restaurant_id  = qs.restaurant


    const result = await axios({
      method: 'GET',
      url: `http://localhost:8900/restaurants/${restaurant_id}`,
      headers: { 'Content-Type': 'application/json' }
    })


    this.setState({ restaurant: result.data, restaurant_id: restaurant_id });
  }

  handleMenuModel = (State, value) => {

    const { restaurant_id } = this.state;
    this.setState({ menuModalIsOpen: true });
    axios({
      method: 'GET',
      url: `http://localhost:8900/menuitems/${restaurant_id}`,
      headers: { 'Content-Type': 'application/json' }

    })

      .then(response => {
        this.setState({ menuitems: response.data[0].menu_items, [State]: value })
      })

      .catch(err => {
        console.log(err);
      });
  }
  openOverview = () => {
    this.setState({ content_value: 1 });
  }
  openContact = () => {
    this.setState({ content_value: 2 });
  }

  handleAdd = (index, operationType) => {
    let total = 0;
    const { menuitems } = this.state;
    let items = [...menuitems];
    let item = items[index];
    // const items = [this.state.menuitems];
    // const item = items[index];

    if (operationType == 'add') {
      item.qty += 1
    }
    if (operationType == 'subtract') {
      item.qty -= 1
    }
    items[index] = item
    items.map((item) => {
      total += item.qty * item.price
    });

    this.setState({ menuitems: items, SubTotal: total });
  }


  render() {
    const { restaurant, menuModalIsOpen, menuitems, galleryModalIsOpen, SubTotal } = this.state;
    return (
      <div>
        {/* <h1>{restaurants.name}</h1> */}
        <div style={{ backgroundColor: "red" }}>
          <Logo />
          <Header />
        </div>
        <div className="mainbox">
          <Carousel showThumbs={false}>
            <div>
              <img className="detailimg" src={restaurant.image} alt="" />

            </div>
            <div>
              <img className="detailimg" src={restaurant.image} alt="" />

            </div>
            <div>
              <img className="detailimg" src={restaurant.image} alt="" />

            </div>
          </Carousel>
          {/* <Carousel>
              <CarouselItem className="detail">
                  <img className="detailimg" src={restaurants.image} alt=""/>
              </CarouselItem>
              <CarouselItem className="detail">
                  <img className="detailimg" src={restaurants.image} alt=""/>
              </CarouselItem>
              <CarouselItem className="detail">
                  <img  className="detailimg"src={restaurants.image} alt=""/>
              </CarouselItem>
          </Carousel> */}
        </div>
        <div className="h2">{restaurant.name}</div>

        <button className="btn1" onClick={() => this.handleMenuModel('menuModalIsOpen', true)}>Place Online Order</button>


        {/* <div className="overview-contact">
                  
                 <button style={this.state.content_value == 1 ? {color:'#ce0505',borderBottom:'2px solid orange'}:{color:'black'}} onClick={this.openOverview} className="overview">Overview</button>
                 <button style={this.state.content_value == 2 ? {color:'#ce0505',borderBottom:'2px solid orange'}:{color:'black'}} onClick={this.openContact} className="contact">Contact</button>
                    
               </div> */}
        <Modal isOpen={galleryModalIsOpen} style={customStyles}>


        </Modal>

        <Modal isOpen={menuModalIsOpen} style={customStyles}>
          {/* <img src={deleteIcon} className="delete-icon"onClick={()=>this.handleMenuModel('menuModalIsOpen',false)}></img> */}
          <div style={{ fontSize: "28px", marginTop: "20px" }}>{restaurant.name}</div>
                         <div>SubTotal : {SubTotal}</div>
          <button style={{ marginBottom: "5px", borderRadius: "7px", backgroundColor: "blue", fontSize: "18px", color: "white", marginTop: "5px", position: "relative", left: "-4px" }}>PayNow</button>
          {menuitems.map((item, index) => {
            return <div>
              <div style={{ fontWeight: 'bold', marginBottom: "4px" }}>{item.name}</div>
              <div style={{ marginBottom: "4px" }}>Rs{item.price}</div>
              <div style={{ marginBottom: "4px" }}>{item.description}</div>
              <div>
                <img height="40" width="40" style={{ float: 'right', position: "relative", left: "-500px", top: '-75px' }} src={item.image_url}></img>
                {item.qty === 0 ? <div>
                  <button style={{ float: "right", position: "relative", right: '500px', top: "-60px" }} onClick={() => { this.handleAdd(index, "add") }}>Add</button>
                </div>
                  : <div>
                    <button onClick={() => this.handleAdd(index, "subtract")}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => this.handleAdd(index, "add")}>+</button>
                  </div>}
              </div>
            </div>
          })}
        </Modal>
        {/* <Details Data={restaurants}/>
  <Details1 Data={restaurants}/> */}
        <div>
          <Tabs>
            <TabList className="tabs">
              <Tab className="Tab1"><h4 onClick={this.openOverview}>Overview</h4></Tab>
              <Tab className="Tab1" ><h4 onClick={this.openContact}>Contact</h4></Tab>
            </TabList>
            <hr style={{ border: "2px solid navy" }} />
            <TabPanel>
              <div><h3>About this place</h3>
                <h4 style={{ color: "navy" }}>Cuisine</h4>
                <p style={{ color: "red" }}>{restaurant.cuisine_id ? restaurant.cuisine_id.map(item => `${item.name}, `) : null}</p>
                <h4 style={{ color: "navy" }}>Average cost</h4>
                <p style={{ color: "red" }}>&#8377;{restaurant.cost} for two people (approx)</p>
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <h4 style={{ color: "navy" }}>Phone Number</h4>

                <p style={{ color: "red" }}>{restaurant.contact_number}</p>

                <h4 style={{ color: "navy" }}>{restaurant.name}</h4>
                <p>Shop 1, Plot D, Samruddhi Complex, Chincholi..<br />Mumbai, Maharashtra -400002</p>

              </div>
            </TabPanel>

          </Tabs>
        </div>
      </div>
    )
  }

}

export default Detail;
//  <Modal isOpen={menuModalIsOpen} style={customStyles}>
          {/* <img src={deleteIcon} className="delete-icon"onClick={()=>this.handleMenuModel('menuModalIsOpen',false)}></img> */}
        //   <div style={{ fontSize: "28px", marginTop: "20px" }}>{restaurant.name}</div>
        //   {/* //                <div>SubTotal : {SubTotal}</div> */}
        //   <button style={{ marginBottom: "5px", borderRadius: "7px", backgroundColor: "blue", fontSize: "18px", color: "white", marginTop: "5px", position: "relative", left: "-4px" }}>PayNow</button>
        //   {menuitems.map((item, index) => {
        //     return <div>
        //       <div style={{ fontWeight: 'bold', marginBottom: "4px" }}>{item.name}</div>
        //       <div style={{ marginBottom: "4px" }}>Rs{item.price}</div>
        //       <div style={{ marginBottom: "4px" }}>{item.description}</div>
        //       <div>
        //         <img height="40" width="40" style={{ float: 'right', position: "relative", left: "-500px", top: '-75px' }} src={item.image_url}></img>
        //         {item.qty === 0 ? <div>
        //           <button style={{ float: "right", position: "relative", right: '500px', top: "-60px" }} onClick={() => { this.handleAdd(index, "add") }}>Add</button>
        //         </div>
        //           : <div>
        //             <button onClick={() => this.handleAdd(index, "subtract")}>-</button>
        //             <span>{item.qty}</span>
        //             <button onClick={() => this.handleAdd(index, "add")}>+</button>
        //           </div>}
        //       </div>
        //     </div>
        //   })}
        // </Modal>