import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Weather extends React.Component {

  render() {
    return (
      this.props.weatherPreview.map((forecast, idx) => (
        <div key={idx}>
        <p>
          {forecast.date}
        </p>
        <p>
          {forecast.description}
        </p>
        </div>
      
      )
      )
      )
  }
}

export default Weather;