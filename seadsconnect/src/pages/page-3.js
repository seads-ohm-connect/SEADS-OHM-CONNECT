import React, { Component } from "react"
import Layout from "../components/layout"

import SEO from "../components/seo"

import { withFirebase } from '../components/Firebase'
import getFirebase from '../components/firebase'
import { Button, Col, Row, Form } from "react-bootstrap"


const INITIAL_STATE = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    address: "",
    city: "",
    stateLoc: "",
    zip: "",
    seadsID : "",
    error: null,
};


const SignUpPage = () => (
    <SignUpForm />
);


class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE
    };
  }

  validateForm() {
    return this.state.email.length > 0    && this.state.password.length > 0 &&
           this.state.address.length > 0  && this.state.city.length > 0     &&
           this.state.zip.length > 0      && this.state.firstName.length > 0       &&
           this.state.lastName.length > 0; 
  }

  validatePassword() {
    return this.state.password === this.state.passwordConfirm;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  onSubmit = event => {
    const { firstName, lastName, email, password, address, city, stateLoc, zip, seadsID} = this.state;
    getFirebase().auth().createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        this.setState({...INITIAL_STATE});
        this.writeUserData(firstName, lastName, email, address, city, stateLoc, zip, seadsID);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  writeUserData(n_first, n_last, n_email, n_address, n_city, n_stateLoc, n_zip, n_seadsID) {
    var db = getFirebase().database();
    var userId = getFirebase().auth().currentUser.uid;

    //write user data to realtime database
    db.ref('users/' + userId).set({
      firstName: n_first,
      lastName: n_last,
      address: n_address,
      city: n_city,
      state: n_stateLoc,
      zip: n_zip
    });

    db.ref('users/' + userId + "/emailAlerts").set({
      email: n_email
    });

    db.ref('users/' + userId + "/seadsDevice").set({
      seadsID: n_seadsID
    });

  }

  render() {

    const {
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      address,
      city,
      stateLoc,
      zip,
      seadsID,
      error,
    } = this.state;


    return (

      <form onSubmit={this.onSubmit}>
        <Layout>
          <div className="Signup">
            <Form>
              <Row>
                <Form.Group as={Col} controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    autoFocus
                    type="name"
                    placeholder="Enter First Name"
                    value={firstName}
                    onChange={this.handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter Last Name"
                    value={lastName}
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={this.handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={this.handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="passwordConfirm">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={passwordConfirm}
                    onChange={this.handleChange}
                  />
                </Form.Group>

              </Row>

              <Row>
                <Form.Group as={Col} controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="address"
                    placeholder="Enter Adress"
                    value={address}
                    onChange={this.handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="seadsID">
                  <Form.Label>SEADS ID</Form.Label>
                  <Form.Control
                    type="ID"
                    placeholder="Enter SEADS ID#"
                    value={seadsID}
                    onChange={this.handleChange}
                  />
                </Form.Group>

              </Row>

              <Row>
                <Form.Group as={Col} controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="City"
                    placeholder="City"
                    value={city}
                    onChange={this.handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="stateLoc">
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
                      value={stateLoc}
                      onChange={this.handleChange}
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="zip">
                  <Form.Label>Zip Code</Form.Label>
                  
                  <Form.Control 
                    placeholder="Zip"
                    value={zip}
                    onChange={this.handleChange}
                  />
                </Form.Group>

              </Row>

                <Button
                  variant="primary"
                  type="submit"
                  disabled={!this.validateForm() || !this.validatePassword()}
                >
                  Create Account
                </Button>

                {error && <p>{error.message}</p>}

            </Form>
          </div>
        </Layout>
      </form>
    );
  }
}

const SignUpForm = withFirebase(SignUpFormBase);

export default SignUpPage;

export { SignUpForm };
