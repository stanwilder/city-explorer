import './App.css';
import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


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
    let lon = locateData.data[0].lon
    let lat = locateData.data[0].lat
    let displayName = locateData.data[0].display_name
    console.log(lat,lon,displayName)
    this.setState({
      lon: lon,
      lat: lat,
      displayName: displayName
      
     
      
    })
    console.log(this.state)
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
      </Form>

    </>


)
}
}



export default App;
