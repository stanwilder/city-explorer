import './App.css';
import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: [],
      // lon: 0,
      // lat: 0
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    let userCity = e.target.city.value
    
    let city = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${userCity}&format=json`;
    console.log(city);
    
    
    let locateData = await axios.get(city)
    let lon = parseInt(locateData.data[0].lon)
    let lat = parseInt(locateData.data[0].lat)
    let displayName = locateData.data[0].display_name
    console.log(lat,lon,displayName)
    let locator = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}¢er=${this.state.lat},${this.state.lon}&zoom=10` 
    this.setState({
      lon: lon,
      lat: lat,
      displayName: displayName,
      locator: locator 
      
      
    })
    // console.log(this.state)
    // let maps = () => {
    //   let locator = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}¢er=${this.props.lat},${this.props.long}&zoom=10`;
    // }
  }; 
  

  
  render() {
    return (
      <>
      <p>{this.state.displayName}</p>

      <Form onSubmit={this.handleSubmit}>
        <Form.Group className="city" controlId="city">
          <Form.Label>Pick a city!</Form.Label>
          <Form.Control type="text" placeholder="Enter City" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Explore!
        </Button>
        {/* {this.maps} */}
        <Card>
        <Card.Img src={this.state.locator}/>

        </Card>
      </Form>



    </>


)
}
}



export default App;
