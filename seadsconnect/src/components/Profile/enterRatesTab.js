import React, { Component } from "react"
import Table from 'react-bootstrap/Table'
import FormControl from 'react-bootstrap/FormControl'
import Appliances from '../../Graphs/DragGraph/appliances'

export default class EnterRates extends Component {
	constructor(props) {
    	super(props);

    	//Appliances = Appliances;

    	//just add appliances to this list to have them show up in the table
    	this.appList = [Appliances.electricFurnace, Appliances.centralAirconditioning, Appliances.windowAC120v, 
    		   Appliances.windowAC240v, Appliances.electricWaterHeater, Appliances.oven, 
    		   Appliances.dishwasher, Appliances.fridge, Appliances.computer, Appliances.washingMachineWarm, 
    		   Appliances.washingMachineHot, Appliances.dryer, Appliances.hairDryer];

    	this.applianceList = this.applianceList.bind(this);
  	}


  	handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }

    applianceList(props) {


      const handleChange = (event, appliance) => {
      	appliance.kWh = event.target.value;
      	Appliances.kWh = event.target.value;
      	appliance.priceEstimate = Math.round(appliance.kWh / 9.09090909 * 100) / 100;
      	alert(appliance.kWh);
      	this.setState({
          [Appliances.dryer.priceEstimate]: event.target.value
        });
      }

      const appArray  = props.appList;
      var   count     = 0;
      const listItems = appArray.map((appliance) =>
      	<tr>
          <td>{count = count + 1}</td>
          <td>{appliance.name}</td>
          <td>
            <FormControl
             placeholder={appliance.kWh}
             onChange={(e) => handleChange(e, appliance)}
    		 />
          </td>
          <td>${appliance.priceEstimate}</td>
        </tr>
      );
      return (
      	<Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Appliance</th>
              <th>kWh</th>
              <th>Price Estimate (per Hour)</th>
            </tr>
          </thead>
        <tbody>
        {listItems}
        </tbody>
		</Table>
      );
    }

   
	render() {
		return(
          <this.applianceList appList={this.appList} />

		)
	}
}