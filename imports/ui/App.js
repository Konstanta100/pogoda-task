import React, { Component } from 'react';
import {withTracker} from  'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Towns } from '../api/towns.js';
import ReactDOM from 'react-dom';
import Town from "./Town.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      sort: false
    };
  }    

  SortTowns() {
    this.setState(state => ({
      sort: !state.sort
    }));
  }

  renderTowns() {
    console.log(this.props.asctowns);
    return this.props.asctowns.map((town) => (
      <Town key={town._id} town={town} />
    ));
  }

  renderSortTowns() {
    console.log(this.props.desctowns);
    return this.props.desctowns.map((town) => (
      <Town key={town._id} town={town} />
    ));
  }
    
  addTown(event) {
    event.preventDefault();
    const town = ReactDOM.findDOMNode(this.refs.town).value.trim();
    if (town !== ''){
        Meteor.call('InsertNewTown', town, (err, res)=>{
            if(!err){
                ReactDOM.findDOMNode(this.refs.town).value="";
            }
        });
    }
  }
  
  render() {
    return (
      <div className="App">
        <div className="Title">
          <strong>WeatherMap</strong>
        </div> 
        <div className="InputTown">
          <form className="form-inline text-center first-child" onSubmit={()=>this.addTown(event)}
          role="form" id="searchform">
            <div className="form-group">
              <input
                className="form-control border-color col-sm-12"
                type="text"
                ref="town"
                placeholder ="Название города" />
            </div>    
            <button type="submit" className="btn btn-danger">Добавить</button>
          </form>
        </div>
        <div className="TownList">
          {this.props.desctowns.length > 0 ?
          <table>
            <tbody>
              <tr className ="Points">
                <td>
                  <button className="Town" onClick={()=> this.SortTowns()}>
                    <span className="tab">Город</span>
                  </button>  
                </td>  
                <td>
                  Температура
                </td>  
                <td>
                  Атмосферное давление
                </td>  
                <td>
                </td>  
              </tr>
              {this.state.sort ? this.renderTowns() : this.renderSortTowns()}  
            </tbody>
          </table>: '' }  
        </div>  
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('towns');
  return { 
    asctowns: Towns.find({}).fetch(),
    desctowns: Towns.find({},{sort:['town', 'desc']}).fetch(),
  };
})(App);