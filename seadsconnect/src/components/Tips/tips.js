import React, { Component } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Media from 'react-bootstrap/Media'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

import getFirebase from '../firebase'

export default class Tips extends Component {



	render() {
		return (
		<div>	
			<Card className="text-center" border="secondary"> 
				<Card.Header as={Card} bg="secondary" text="white">
					<h3>What is a Peak Hour</h3>
				</Card.Header>
				<Card.Body> 
					<Card.Text>
					Peak hours are times of day when demand for energy is high. Demand is influenced by various factors such as weather, holidays, the specific time of day.
  			  Not only will reducing energy consumption during these time periods reduce one's enviornmental impact but can also lead to earning credits and prizes through "OhmConnect."
					</Card.Text>
				</Card.Body>
			</Card>

			<Card className="text-center" border="success">
				<Card.Header as={Card} bg="success" text="white"> <h3>Tips</h3> </Card.Header>

				<Card.Title style={{paddingTop: 20}}> Spread energy usage out accross the day </Card.Title>
					<Card.Body>Avoid using high energy consuming appliances during peak hours. Using energy during peak hour 
  			      forces energy companies to buy power from expensive and inefficient power plants called, "peaker plants." 
					</Card.Body>

				<Card.Title> Schedule your consumption </Card.Title>
					<Card.Body>Plan ahead of time to reduce which appliances are running during peak hours. For example, 
  			      consider using the heater or air conditioner just before peak hours to get 
  			      your house to a desired temperature without actually having to run them during peak hours.
					</Card.Body>
			
				<Card.Title> Get to know your appliances </Card.Title>
					<Card.Body>
							Reducing the usage of some appliances has a much greater effect than others. For example, it will take the average 
  			      computer 20 hours to use the same amount of energy the average dryer will use in one hour. 
					</Card.Body>

				<Media>
					<Media.Body>
						<Container>
							
								<OverlayTrigger placement="right" overlay= {
									<Popover id="Dryer" title="Average Dryer">
										<p>
											<strong>Watts:</strong> 3.0
										</p>
										<p>
											<strong>$</strong>0.34
										</p>
									</Popover>
								} >
								<Alert variant="primary">Dryer</Alert>
								</OverlayTrigger>
							
						
									<OverlayTrigger placement="right" overlay= {
									<Popover id="Washer" title="Average Washer">
										<p>
											<strong>Watts:</strong> 6.3
										</p>
										<p>
											<strong>$</strong>0.70
										</p>
									</Popover>
								} >
								<Alert variant="primary">Washing Machine (Hot)</Alert>
								</OverlayTrigger>
							
						
									<OverlayTrigger placement="right" overlay= {
									<Popover id="Oven" title="Average Oven">
										<p>
											<strong>Watts:</strong> 2.3
										</p>
										<p>
											<strong>$</strong>0.25
										</p>
									</Popover>
								} >
								<Alert variant="primary">Oven</Alert>
								</OverlayTrigger>
								
							
								<OverlayTrigger placement="right" overlay= {
									<Popover id="Dishwasher" title="Average Dishwasher">
										<p>
											<strong>Watts:</strong> 1.58
										</p>
										<p>
											<strong>$</strong>0.18
										</p>
									</Popover>
								} >
								<Alert variant="primary">Dishwasher</Alert>
								</OverlayTrigger>
							
						
									<OverlayTrigger placement="right" overlay= {
									<Popover id="Fridge" title="Average Fridge">
										<p>
											<strong>Watts:</strong> 0.07
										</p>
										<p>
											<strong>$</strong>0.01
										</p>
									</Popover>
								} >
								<Alert variant="primary">Fridge</Alert>
								</OverlayTrigger>
							
						
									<OverlayTrigger placement="right" overlay= {
									<Popover id="Computer" title="Average Computer">
										<p>
											<strong>Watts:</strong> 0.15
										</p>
										<p>
											<strong>$</strong>0.02
										</p>
									</Popover>
								} >
								<Alert variant="primary">Computer</Alert>
								</OverlayTrigger>
								
						</Container>

					</Media.Body>
			</Media>
			
			</Card>	
		 </div>	  
		)
	}
}