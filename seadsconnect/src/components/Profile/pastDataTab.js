import React, { Component } from "react"
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Media from 'react-bootstrap/Media'


export default class PastData extends Component {

	render() {
		return (
			<div>
			  <Jumbotron>
  			    <h1>This page is where past data can go.</h1>
  			    <p>
  			    Placeholder
  			    </p>
		      </Jumbotron>

		    <ul className="list-unstyled">
  			<Media as="li">
  			  <Media.Body>
  			    <h5>Show how many Ohm Connect Credits the user has gained</h5>
  			    <p>
  			    Show a wallet and matrics of how much the user has earned over the month/year 
  			    and project future earnings.  
  			    </p>
  			  </Media.Body>
  			</Media>
			
  			<Media as="li">
  			  <Media.Body>
  			    <h5>Charts showing power usage</h5>
  			    <p>
  			      Graphs showing power consumption over the day/month/year.
  			      When the deaggregation works we could possibly show appliances that are using 
  			      the most energy. 
  			    </p>
  			  </Media.Body>
  			</Media>
			
  			<Media as="li">
  			  <Media.Body>
  			    <h5>Show information about past ohm hours</h5>
  			    <p>
  			      When they  typically occur and make estimates for when they will occur next.
  			    </p>
  			  </Media.Body>
  			</Media>
  			</ul>
		    </div>
		)
	}
}