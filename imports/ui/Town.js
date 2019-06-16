import React, { Component } from 'react';

import { Meteor } from 'meteor/meteor';

class Town extends Component {
    constructor() {
      super();
      this.state = {
        weatherData: null
      };
    }

    DeleteTown () {
      const townId = this.props.town._id;
      Meteor.call("DeleteTown", townId);
    }

    componentDidMount() {
      const town = this.props.town.town;
      const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      town   +"&appid=28286bef88f55c3faeb06bf0d43ed625&units=Metric";
      fetch(URL).then(res => res.json()).then(json => {
        if (json.main){
          this.setState({ weatherData: json });
        }  
      });
    }

    render() {
      const weatherData = this.state.weatherData;
      if (!weatherData) return (
          <tr>
            <td>
              <span className="tab"><strong>{this.props.town.town}</strong></span>
            </td>   
            <td>-</td> 
            <td>-</td>
            <td>
              <button className="Delete" onClick={()=> this.DeleteTown()}>Удалить</button>
            </td>  
          </tr> 
        ); 
      return (
        <tr>
          <td>
            <span className="tab"><strong>{this.props.town.town}</strong></span>
          </td>  
          <td>    
            <strong>{weatherData.main.temp}C°</strong>
          </td>    
          <td>    
            <strong>{weatherData.main.pressure} hPa</strong>
          </td>  
          <td>    
            <button className="Delete" onClick={()=> this.DeleteTown()}>Удалить</button>
          </td>  
        </tr>  
      );
    }
}

export default Town;