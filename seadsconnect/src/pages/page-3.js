import React, { Component } from "react"
import Layout from "../components/layout"
import { Button, Col, Row, Form } from "react-bootstrap";




export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
      address: "",
      city: "",
      stateLoc: "",
      zip: "",
      ohmConnect: false
    };
  }


  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0 &&
    this.state.address.length > 0      && this.state.city.length > 0     &&
    this.state.state.length > 0        && this.state.zip.length > 0;     
  }

  validatePassword() {
    return this.state.password == this.state.passwordConfirm;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    return (
      <Layout>
      <div className="Signup">
        <Form>
        
          <Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                autoFocus
                  type="email" 
                  placeholder="Enter email"
                  //value={this.state.email}
                  //onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password"
                placeholder="Enter Password"
                //value={this.state.password}
                //onChange={this.handleChange} 
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Confirm Password"
                //value={this.state.passwordConfirm}
                //onChange={this.handleChange}
              />
            </Form.Group>

          </Row>

            <Form.Group controlId="formGridAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control 
                type="address" 
                placeholder="Enter Adress" 
                //value={this.state.address}
                //onChange={this.handleChange}
              />
            </Form.Group>

          <Row>

            <Form.Group as={Col} controlId="formGridAddress">
              <Form.Label>City</Form.Label>
              <Form.Control 
                type="City" 
                placeholder="City"
                //value={this.state.city}
                //onChange={this.handleChange} 
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAddress">
              <Form.Label>State</Form.Label>
              <Form.Control as="select">
                <option>Choose...</option>
                <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                  //value={this.state.state}
                  //onChange={this.handleChange}
                </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control 
                //value={this.state.zip}
                //onChange={this.handleChange}
              />
            </Form.Group>

          </Row> 

           <Form.Group id="formGridCheckbox">
              <Form.Check type="checkbox" label="Connect to OhmConnect" />
           </Form.Group>


            <Form.Group id="formGridSignUp">
              <Button 
                variant="primary" 
                type="submit"
                //disabled={!this.validateForm() || !this.validatePassword()}
              >
                Create Account
              </Button>
            </Form.Group>
 
        </Form>
      </div>
      </Layout>
    );
  }
}

