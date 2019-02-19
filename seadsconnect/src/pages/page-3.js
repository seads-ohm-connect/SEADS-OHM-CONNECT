import React, { Component } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { withFireBase } from '../components/Firebase'
import { Button, Col, Row, Form } from "react-bootstrap"

const INITIAL_STATE = {
    email: "",
    password: "",
    passwordConfirm: "",
    address: "",
    city: "",
    stateLoc: "",
    zip: "",
    ohmConnect: false,
    error: null,
};


const SignUpPage = () => (
    
);

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE
    };
  }

  validateForm() {
    return this.state.email.length > 0    && this.state.password.length > 0 &&
           this.state.address.length > 0  && this.state.city.length > 0     &&
           this.state.zip.length > 0;
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
    const { email, password, address, city, stateLoc, zip } = this.state;

      this.props.firebase
      .doCreateuserWithEmailAndPassword(email, password)
      .then(authUser => {
        return this.props.firebase.user(authUser.user.uid).set({
          email,
        });
      })
      .then(() => {
        this.setState({...INITIAL_STATE});
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {

    const {
      email,
      password,
      passwordConfirm,
      address,
      city,
      stateLoc,
      zip,
      ohmConnect,
      error,
    } = this.state;


    return (

      <form onSubmit={this.onSubmit}>
        <Layout>
          <div className="Signup">
            <Form>
              <Row>
                <Form.Group as={Col} controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    autoFocus
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

                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="address"
                    placeholder="Enter Adress"
                    value={address}
                    onChange={this.handleChange}
                  />
                </Form.Group>

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
                    value={zip || "Choose..."}
                    onChange={this.handleChange}
                  />
                </Form.Group>

              </Row>

               <Form.Group id="ohmConnect">
                  <Form.Check type="checkbox" label="Connect to OhmConnect" />
               </Form.Group>

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

export default SignUpPage;

export { SignUpForm };
