import React, { Component } from "react"
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import Button from 'react-bootstrap/Button'


export default class HomeCard extends Component {

	render() {
		return (

		<CardColumns>
		   <Card border="primary">
		      <Card.Img variant="top" src="/src/images/ohmconnect" />
		      <Card.Body>
		        <Card.Title>SEADS</Card.Title>
		        <Card.Text>
		          Get the SEADS device connected and installed in your Home.
		        </Card.Text>
		      </Card.Body>
		      <Card.Footer>
		        <Button variant="outline-secondary">Sign Up</Button>
		      </Card.Footer>
		    </Card>

		    <Card bg="primary" text="white" className="text-center p-3">
              <blockquote className="blockquote mb-0 card-body">
                <p>
                  Sign up with SEADSConnect to receive realtime power consumption analytics.
                </p>
                <small className="text-muted">
                   <Button variant="outline-light" href="/page-3/">Sign Up</Button>
                </small>
              </blockquote>
  			</Card>

  			<Card border="primary">
		      <Card.Img variant="top" src="holder.js/100px160" />
		      <Card.Body>
		        <Card.Title>OhmConnect</Card.Title>
		        <Card.Text>
		          Sign up with OhmConnect to earn prizes based on the energy you save.
		        </Card.Text>
		      </Card.Body>
		      <Card.Footer>
		        <Button variant="outline-secondary"  href="https://www.ohmconnect.com/#Sign-up-Form">Sign Up</Button>
		      </Card.Footer>
		    </Card>
		</ CardColumns>
		)
	}

}