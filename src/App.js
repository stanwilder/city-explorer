import './App.css';
import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Weather from './Weather';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: [],
      error: false,
      errorMessage: '',
      weatherArr: [],
      weatherPreview: false,
      targetCityName: '',
      lon: 0,
      lat: 0
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {

      let userCity = e.target.city.value

      let city = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${userCity}&format=json`;
      console.log(city);


      let locateData = await axios.get(city)
      let lon = parseInt(locateData.data[0].lon)
      let lat = parseInt(locateData.data[0].lat)
      let displayName = locateData.data[0].display_name
      console.log(lat, lon, displayName)
      let locator = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${lat},${lon}&zoom=10`;


      this.handleWeather(e)



      this.setState({
        lon: lon,
        lat: lat,
        displayName: displayName,
        locator: locator,
        targetCityName: userCity

      }

      )
    } catch (error) {
      console.log('error: ', error.response);
      this.setState({
        error: true,
        errorMessage: `An Error has occured: ${error.response.status}`
      })
    }

  };

  handleWeather = async (e) => {
    e.preventDefault()
    let weatherUrl = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.targetCityName}`
    let weatherData = await axios.get(weatherUrl)
    let truthy = false;
    // help from Raul
    if (weatherData !== null) truthy = true;
    this.setState({
      weatherArr: weatherData,
      weatherPreview: truthy

    })
  }
}

render() {
  return (
    <>
      <p>{this.state.displayName}</p>
      <p>{this.state.lat}</p>
      <p>{this.state.lon}</p>

      <Form onSubmit={this.handleSubmit}>
        <Form.Group className="city" controlId="city">
          <Form.Label></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
          />
        </Form.Group>
        <Button type="submit">
          Explore!
        </Button>
      </Form>

      {
        this.state.weatherPreview &&
        <Weather>
          weatherArr = {
            this.state.weatherArr
          }
        </Weather>
      }


      {
        this.state.error
          ?
          <p>{this.state.errorMessage}</p>
          :
          <ul>

          </ul>
      }

      <Card>
        <Card.Img src={this.state.locator} />

      </Card>





    </>


  )
}




export default App;













