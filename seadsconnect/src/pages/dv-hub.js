import React, { Component } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Thresholdbar from "../components/Thresholdbar/thresholdbar"
import { Button, Row, Form , ToggleButton, Col, ButtonToolbar, ButtonGroup} from "react-bootstrap"
import Appliances from "../Graphs/DragGraph/appliances"
import GetDevice from "../components/Profile/getDeviceID"

import getFirebase from '../components/firebase'

var d3 = require("d3");

//Thresholdbar: Change pass watts into value and change max to what ever you want.
class DvHub extends Component {
	constructor(props) {
    	super(props);
			this.state = {
				val: 0,
				m: 100,
				liveData: 0,
				liveTime: new Date().toLocaleString(),
				washerToggleOn: true,
				dryerToggleOn: true,
				ovenToggleOn: true,
				fridgeToggleOn: true,
				dishwasherToggleOn: true,
				computerToggleOn: true
			}
			this.device = new GetDevice()

	}

	//queries the data base to see if there is a value enetered for the appliance.
	//if not it uses the static database values
	setValue(req, toggle) {

		var watts = req.watts;
		//if user not signed in just use values from database
		if (!getFirebase().auth().currentUser) {
			if (toggle)
				this.setState({val: this.state.val + watts});
			else
				this.setState({val: this.state.val - watts});
		}
		else {

			var userId = getFirebase().auth().currentUser.uid;
			var ref = getFirebase().database().ref('users/' + userId + '/appliances/' + req.name + '/watts');
			ref.once("value",snapshot => {
				if (snapshot.exists()) {
					if (toggle)
						this.setState({val: this.state.val + parseFloat(snapshot.val())});
					else
						this.setState({val: this.state.val - parseFloat(snapshot.val())});
				}
				else {
					if (toggle)
						this.setState({val: this.state.val + watts});
					else
						this.setState({val: this.state.val - watts});
				}
			});
		}
    }


	toggleWasher = () => {

		if(this.state.washerToggleOn){
			this.setValue(Appliances.washingMachineHot, true);
		}
		else{
			this.setValue(Appliances.washingMachineHot, false);
		}
	}

	changeColorWasher = () => {
		this.setState({washerToggleOn: !this.state.washerToggleOn})
	}

	toggleDryer = () => {
		if(this.state.dryerToggleOn){
			this.setValue(Appliances.dryer, true);
		}
		else{
			this.setValue(Appliances.dryer, false);
		}
	}

	changeColorDryer = () => {
		this.setState({dryerToggleOn: !this.state.dryerToggleOn})
	}

	toggleOven = () => {
		if(this.state.ovenToggleOn){
			this.setValue(Appliances.oven, true);
		}
		else{
			this.setValue(Appliances.oven, false);
		}
	}


	changeColorOven = () => {
		this.setState({ovenToggleOn: !this.state.ovenToggleOn})
	}

	toggleFridge = () => {
		if(this.state.fridgeToggleOn){
			this.setValue(Appliances.fridge, true);
		}
		else{
			this.setValue(Appliances.fridge, false);
		}
	}

	changeColorFridge = () => {
		this.setState({fridgeToggleOn: !this.state.fridgeToggleOn})
	}

	toggleDishwasher = () => {
		if(this.state.dishwasherToggleOn){
			this.setValue(Appliances.dishwasher, true);
		}
		else{
			this.setValue(Appliances.dishwasher, false);
		}
	}

	changeColorDishwasher = () => {
		this.setState({dishwasherToggleOn: !this.state.dishwasherToggleOn})
	}

	toggleComputer = () => {
		if(this.state.computerToggleOn){
			this.setValue(Appliances.computer, true);
		}
		else{
			this.setValue(Appliances.computer, false);
		}
	}

	changeColorComputer = () => {
		this.setState({computerToggleOn: !this.state.computerToggleOn})
	}

	componentDidMount() {
        this.interval = setInterval(() => this.updatePower(), 1000);
    }


    componentWillUnmount() {
        clearInterval(this.interval);
    }

	updatePower = () => {

		var userID = getFirebase().auth().currentUser.uid;
		this.device.getSeadsData(userID).then((powTime) => {
			if(powTime){
				this.device.liveData = powTime[0];
				this.device.liveTime = powTime[1];
			}
		});

		this.setState({liveData: this.device.liveData});
		this.setState({liveTime: this.device.liveTime});
	}

	render() {
		let washerColor = this.state.washerToggleOn ? "outline-success" : "success";
		let dryerColor = this.state.dryerToggleOn ? "outline-success" : "success";
		let ovenColor = this.state.ovenToggleOn ? "outline-success" : "success";
		let fridgeColor = this.state.fridgeToggleOn ? "outline-success" : "success";
		let dishwasherColor = this.state.dishwasherToggleOn ? "outline-success" : "success";
		let computerColor = this.state.computerToggleOn ? "outline-success" : "success";

		return (
		<Layout>
			<h1>current power: { (this.state.val + parseFloat(this.state.liveData)).toFixed(2) } watts</h1>
			<h2>current date: { this.state.liveTime }</h2>
  			<Thresholdbar value={(this.state.val + parseFloat(this.state.liveData)).toFixed(2)} max={this.state.m} threshold1={50} threshold2={90} threshold3={100}/>
				<div align="center">
					<ButtonGroup>
						<ButtonToolbar>
							<Button variant={washerColor} onClick={() => {this.toggleWasher(); this.changeColorWasher()}} >Washer</Button>
							<Button variant={dryerColor} onClick={() => {this.toggleDryer(); this.changeColorDryer()}} >Dryer</Button>
							<Button variant={ovenColor} onClick={() => {this.toggleOven(); this.changeColorOven()}} >Oven</Button>
							<Button variant={fridgeColor} onClick={() => {this.toggleFridge(); this.changeColorFridge()}} >Fridge</Button>
							<Button variant={dishwasherColor} onClick={() => {this.toggleDishwasher(); this.changeColorDishwasher()}} >Dishwasher</Button>
							<Button variant={computerColor} onClick={() => {this.toggleComputer(); this.changeColorComputer()}} >Computer</Button>
						</ButtonToolbar>
					</ButtonGroup>
				</div>
  		</Layout>
		)
	}
}


export default DvHub
