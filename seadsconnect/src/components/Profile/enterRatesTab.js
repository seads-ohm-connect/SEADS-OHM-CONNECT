import React, { Component } from "react"
import Table from 'react-bootstrap/Table'
import FormControl from 'react-bootstrap/FormControl'
import Appliances from '../../Graphs/DragGraph/appliances'
import getFirebase from '../Firebase'

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
        var db = getFirebase().database();
        var userId = getFirebase().auth().currentUser.uid;

        //write appliance values to realtime database
        db.ref('/users/' + userId + '/appliances/' + appliance.name).set({ 
          watts: event.target.value,
          price: (Math.round(event.target.value / 9.09090909 * 100) / 100) 
        });  


      	appliance.watts = event.target.value;
      	appliance.priceEstimate = Math.round(appliance.watts / 9.09090909 * 100) / 100;
      	this.setState({
          [event.target.id]: event.target.value
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
             id={appliance.name}
             type="number"
             placeholder={appliance.watts}
             onChange={(e) => handleChange(e, appliance)}
    		 />
          </td>
          <td id={appliance.name + '1'}>${Math.round(appliance.watts / 9.09090909 * 100) / 100}</td>
        </tr>
      );
      //see if the values are in the database... update the labels if so
      this.getValues();
      return (
      	<Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Appliance</th>
              <th>Power (Watts)</th>
              <th>Price Estimate (per Hour)</th>
            </tr>
          </thead>
          <tbody>
            {listItems}
          </tbody>
		    </Table>
      );
    }

  //initialize the placeholders when the user loads the page.
  //if the appliance is found in the realtime database, set the placeholder for that appliance to the value and
  //set the value of the price to the corresponding price.
  //if it is not in the database, dont change the value (uses the static database by default)
  getValues() {

    if (!getFirebase().auth().currentUser)
      return;    

    var db = getFirebase().database();
    var userId = getFirebase().auth().currentUser.uid;
    var appliance = 0;
    for(appliance in this.appList) {
      var name = this.appList[appliance].name;
      (function(name) {
        var ref = db.ref('/users/' + userId + '/appliances/' + name + "/watts").once("value",snapshot => {
          if (snapshot.exists()) {
            document.getElementById(name).placeholder = snapshot.val();
            document.getElementById(name + '1').innerHTML = Math.round(snapshot.val() / 9.09090909 * 100) / 100;
          }
        });
      })(name);
    }
  }


   
	render() {
		return(
          <this.applianceList appList={this.appList} />

		)
	}
}
