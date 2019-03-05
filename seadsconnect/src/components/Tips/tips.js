import React, { Component } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Media from 'react-bootstrap/Media'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

export default class Tips extends Component {



	render() {
		return (
		<div>	
		  <Jumbotron>
  			<h1>Tips for Reducing Power During Peak Hours</h1>
  			<p>
  			  Peak hours are times of day when demand for energy is high. Demand is influenced by varius factors such as weather, holidays, the specific time of day.
  			  Not only will reducing energy consumption during these time periods reduce one's enviornmental impact but can also lead to earning credits and prizes through "Ohm Connect."
  			</p>
		  </Jumbotron>

		  <ul className="list-unstyled">
  			<Media as="li">
  			  <Media.Body>
  			    <h5>Spread energy usage out across the day</h5>
  			    <p>
  			      Avoid using high energy consuming appliances during peak hours. Using energy during peak hour 
  			      forces energy companies to buy power from expensive and inefficient power plants called, "peaker plants." 
  			    </p>
  			  </Media.Body>
  			</Media>
			
  			<Media as="li">
  			  <Media.Body>
  			    <h5>Schedule your consumption</h5>
  			    <p>
  			      Plan ahead of time to reduce which appliances are running during peak hours. For example, 
  			      consider using the heater or air conditioner just before peak hours to get 
  			      your house to a desired temperature without actually having to run them during peak hours.
  			    </p>
  			  </Media.Body>
  			</Media>
			
  			<Media as="li">
  			  <Media.Body>
  			    <h5>Get to know your appliances</h5>
  			    <p>
  			      Reducing the usage of some appliances has a much greater effect than others. For example, it will take the average 
  			      computer 20 hours to use the same amount of energy the average dryer will use in one hour. 
  			    </p>
  			    <p>
  			      Hover your mouse over the difference appliances to the right to view the different power usage and cost for each.
  			    </p>
  			  </Media.Body>

  			  <Media.Body>
  			    <Container>
  			     
  			        <OverlayTrigger placement="right" overlay= {
  			          <Popover id="Dryer" title="Average Dryer">
  			            <p>
  			              <strong>kWh:</strong> 3.0
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
  			              <strong>kWh:</strong> 6.3
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
  			              <strong>kWh:</strong> 2.3
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
  			              <strong>kWh:</strong> 1.58
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
  			              <strong>kWh:</strong> 0.07
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
  			              <strong>kWh:</strong> 0.15
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

		  </ul>	
		 </div>	  
		)
	}
}