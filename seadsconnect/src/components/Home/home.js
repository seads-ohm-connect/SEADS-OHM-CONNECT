import React, { Component } from "react"
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import Button from 'react-bootstrap/Button'
import SeadsBanner from '../../images/seads-logotest.png'
import OhmBanner from '../../images/ohmconnecttest.png'
import Updater from "../Firebase/adminDBupdater"


export default class HomeCard extends Component {

	render() {
		return (
		<CardColumns>
				<Updater />
		   <Card border="primary" bg="info" text="white">
					<Card.Body>
		        <Card.Title>SEADS</Card.Title>
		        <Card.Text>
		          Get the SEADS device connected and installed in your Home.
		        </Card.Text>
		      </Card.Body>
		      <Card.Footer>
		        <Button variant="outline-light">Sign Up</Button>
		      </Card.Footer>
					
		    </Card>

		    <Card border="primary" bg="info" text="white">
					<Card.Body>
		        <Card.Title>SEADSConnect</Card.Title>
		        <Card.Text>
		          Sign up with SEADSConnect to get real time power consumption analytics 
		        </Card.Text>
		      </Card.Body> 
					<Card.Footer> 
						<Button variant="outline-light" href="/page-3/"> Sign Up </Button> 
					</Card.Footer>
  			</Card>

  			<Card border="primary" bg="info" text="white">
		      <Card.Body>
		        <Card.Title>OhmConnect</Card.Title>
		        <Card.Text>
		          Sign up with OhmConnect to earn prizes based on the energy you save.
		        </Card.Text>
		      </Card.Body>
		      <Card.Footer>
		        <Button variant="outline-light"  href="https://www.ohmconnect.com/#Sign-up-Form">Sign Up</Button>
		      </Card.Footer>
					
		    </Card>
		</CardColumns>
		)
	}

}