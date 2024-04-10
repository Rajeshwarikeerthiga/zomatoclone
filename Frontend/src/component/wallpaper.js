import React from "react";
import '../component/style/style.css';
// import bgimg from '../Assets/images.jpg';
import axios from "axios";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
class Wallpaper extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurant: [],
      restaurentsByName: [],
      inputText: "",
      suggestions: []
    }
  }
  componentDidMount() {
    axios({
      method: "GET",
      url: "http://localhost:8900/restaurants",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        this.setState({ restaurant: response.data });
      })
      .catch(err => console.log(err));
  }
  handleLocation = (event) => {
    const location_id = event.target.value;
    sessionStorage.setItem("location_id",location_id)
    axios({
      method: "GET",
      url: `http://localhost:8900/location/${location_id}`,
      headers: { 'Content-type': 'application/json' }
    })
      .then(response => {
        this.setState({ restaurentsByName: response.data });
      })
      .catch(err => console.log(err));
  }
  handleSearch = (event) => {
    let inputText = event.target.value;
    const { restaurentsByName } = this.state;
    const suggestions = restaurentsByName.filter((item) => item.name.toLowerCase().includes(inputText.toLowerCase()));
    this.setState({ suggestions, inputText });
  }
  showSuggestion = () => {
    const { suggestions, inputText } = this.state;
    if (suggestions.length == 0 && inputText == undefined) {
      return null;
    }
    if (suggestions.length > 0 && inputText == '') {
      return null;
    }
    if (suggestions.length == 0 && inputText) {
      return <ul className="ulsuggestion">
        <li >No Search Results found</li>
      </ul>
    }
    return (
      <ul className="ulsuggestion">
        {suggestions.map((item, index) => (<li key={index} onClick={() => this.selectingRestaurant(item._id)}>{`${item.name} - ${item.locality},${item.city}`}</li>))}
      </ul>
    );

  }
  selectingRestaurant = (resobj) => {
    this.props.history.push(`/detail?restaurant=${resobj}`);
  }
  render() {
    const { LocationData } = this.props;
    return (
      <div id="first">
        <div >
          {/* <img src={bgimg} className="wallpaper" style={{width:"100%",height:"450px"}} alt=""/> */}

          <p id="edureka">yk!</p>
          <p id="para"> Find the best restaurents, Cafes and Bars</p>
          <select className="placeh" onChange={this.handleLocation}>
            <option value='0'>Select</option>
            {LocationData.map((item) => {
              return <option value={item.location_id}>{`${item.name}, ${item.city}`}</option>;
            })}
          </select>
          <div className="notebooks">
            <input type="search" className="int" placeholder="Search for restaurants" onChange={this.handleSearch} />
            {this.showSuggestion()}
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Wallpaper);