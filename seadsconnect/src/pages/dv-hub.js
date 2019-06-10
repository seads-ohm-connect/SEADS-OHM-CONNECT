import React, { Component } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Thresholdbar from "../components/Thresholdbar/thresholdbar"
import 'bootstrap/dist/css/bootstrap.css';
import { Alert, Button, CardGroup, Row, Form , ToggleButton, Col, ButtonToolbar, ButtonGroup, Card, Container} from "react-bootstrap"
import Appliances from "../Graphs/DragGraph/appliances"
import GetDevice from "../components/Profile/getDeviceID"
import GetOhmData from "../components/Profile/OhmConnect"


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
				targetThreshold: 0,
				ohmHourDate: new Date().toString(),
				ohmHourStart: 0,
				ohmHourEnd: 0,
				washerToggleOn: true,
				dryerToggleOn: true,
				ovenToggleOn: true,
				fridgeToggleOn: true,
				dishwasherToggleOn: true,
				computerToggleOn: true
			}

			this.device = new GetDevice()
      this.ohmData = new GetOhmData()

	}


	componentDidMount() {
		this.interval = setInterval(() => this.updatePower(), 500);
		console.log("go to jbaskin 316 and look for the turkey picture on the whiteboard ")
		console.log("austin was an onion ring back in 3012")
    }

  componentWillUnmount() {
        clearInterval(this.interval);
	}

	updatePower = () => {

		if (getFirebase().auth().currentUser) {
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
		else {
			var currentTime = new Date().toLocaleString();
			this.setState({liveTime: currentTime});
		}
		this.ohmTargetDate();
	}

	ohmTargetDate() {
		if (getFirebase().auth().currentUser) {
			var userID = getFirebase().auth().currentUser.uid;
			this.ohmData.getOhmHourThreshold(userID).then((thresholdValue) => {
				if(thresholdValue){
					this.ohmData.threshold = thresholdValue;
				}
			});
			this.ohmData.getOhmDate(userID).then((ohmDate) => {
				if(ohmDate){
					this.ohmData.ohmHourDate = ohmDate;
				}
			}); 
			this.ohmData.getOhmStartTime(userID).then((ohmStartTime) => {
				if(ohmStartTime) {
					this.ohmData.startTime = ohmStartTime;
				}
			});
			this.ohmData.getOhmEndTime(userID).then((ohmEndTime) => {
				if(ohmEndTime) {
					this.ohmData.endTime = ohmEndTime;
				}
			});
			this.setState({targetThreshold: this.ohmData.threshold});
			this.setState({ohmHourDate: this.ohmData.ohmHourDate});
			this.setState({ohmHourStart: this.ohmData.startTime});
			this.setState({ohmHourEnd: this.ohmData.endTime});
		}
	}
	

	render() {

		return (
		<Layout>
			  <Container>
					<Card className="text-center" border="info" bg="info" text="white">
						<Card.Body>
							<h3>The information below gives you real time updates on your power usage as well as any upcoming OhmHours</h3>
						</Card.Body>
					</Card>
					<Card className="text-center" border="info">
						<Card.Header as={Card} bg="success" text="white" style={ohmHourHeaderStyle}><h1>Your Upcoming OhmHour</h1></Card.Header>
						<Card.Body>
							<Alert variant="primary">
								<h3> {this.state.ohmHourDate} </h3> 
							</Alert>
							<Alert variant="primary">
								<h3> {this.state.ohmHourStart} - {this.state.ohmHourEnd} </h3>
							</Alert>
						</Card.Body>
					</Card>
					<CardGroup>
								<Card className="text-center" border="info">
								<Card.Header as={Card} bg="info" text="white" style={dataHeaderStyle}><h1>Current Usage</h1></Card.Header>
								<Card.Body>
								<Container>
									<Row>
										<Col/>
										<Col>
											<div class="dot" class="p-3 mb-2 bg-info text-white" style={liveWattsCircle} align="center">
												<h1 style={liveDataStyle}>{ this.state.liveData }</h1>
												<h1>watts</h1>
											</div>
										</Col>
										<Col/>
									</Row>
								</Container>
								</Card.Body>
							</Card>
								<Card className="text-center" border="info">
									<Card.Header as={Card} bg="warning" text="white" style={dataHeaderStyle}><h1>Target</h1></Card.Header>
									<Card.Body>
									<Container>
										<Row>
											<Col></Col>
											<Col>
												<div class="dot" class="p-3 mb-2 bg-warning text-white" style={liveWattsCircle} align="center">
													<h1 style={liveDataStyle}>{ this.state.targetThreshold }</h1>
													<h1>watts</h1>
												</div>
											</Col>
											<Col></Col>
										</Row>
									</Container>
									</Card.Body>
								</Card>
					</CardGroup>
				</Container>
  	</Layout>
		)
	}
}

const dataHeaderStyle = {
	fontSize: 40
}

const ohmHourHeaderStyle = {
	fontSize: 15
}

const liveWattsCircle = {
	height: 200,
	width: 200, 
	borderRadius: 100,
}

const liveDataStyle = {
	fontSize: 70
}

export default DvHub