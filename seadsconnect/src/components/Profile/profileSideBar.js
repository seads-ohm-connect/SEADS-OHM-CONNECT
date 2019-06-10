/*
  This module manages the side bar of the profile page.

*/

import React, { Component } from "react"
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Tab from 'react-bootstrap/Tab'

import PastData from './pastDataTab'
import AccountSettings from './accountSettings'
import EnterRates from './enterRatesTab'

export default class ProfileSideBar extends Component {
	constructor(props) {
    	super(props);

  }

	render() {
		return (
			<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
			<Row>
			<Col sm={4.1}>
			  <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>Profile</Card.Title>
                  <Card.Text>
                    Update various settings.
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush" defaultActiveKey="#link1">
                  <ListGroupItem variant="secondary" action href="#link1">View Past Energy Consumption Data</ListGroupItem>
                  <ListGroupItem variant="secondary" action href="#link2">Update Profile Settings</ListGroupItem>
                  <ListGroupItem variant="secondary" action href="#link3">Enter Appliance Consumption Rates</ListGroupItem>
                </ListGroup>
		      </Card>
		    </Col>
		    <Col sm={7}>
              <Tab.Content>
                <Tab.Pane eventKey="#link1">
                  <PastData />
                </Tab.Pane>
                <Tab.Pane eventKey="#link2">
                  <AccountSettings />
                </Tab.Pane>
                <Tab.Pane eventKey="#link3">
                  <EnterRates />
                </Tab.Pane>
              </Tab.Content>
            </Col>
            </Row>
            </Tab.Container>
		)
	}
}