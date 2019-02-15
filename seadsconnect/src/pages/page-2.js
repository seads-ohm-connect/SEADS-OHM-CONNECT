import React, { Component } from "react";
import { Button, FormGroup, Form } from "react-bootstrap";
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { FirebaseContext } from '../components/Firebase'

const SignInPage = () => (
  <FirebaseContext.Consumer>
    {firebase => <Login firebase={firebase} />}
  </FirebaseContext.Consumer>
);

const INITIAL_STATE = {
	email: "",
    password: ""
}

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
  	const { email, password } = this.state;
    this.props.firebase
   	 .doSignInWithEmailAndPassword(email, password)
     .then(authUser => {
       this.setState({ ...INITIAL_STATE });
     })
       .catch(error => {
       this.setState({ error });
    });
    event.preventDefault();
  }

  render() {
  	return (
  		<Layout>
	  		<div className="Login">
	  		<Form>
	        	<form onSubmit={this.handleSubmit}>
	        		<FormGroup controlId="email">
	        			<Form.Label>Email </Form.Label>
	        			<Form.Control
	        				autoFocus
	        				type="email" 
	        				placeholder="Enter email"
	        				value={this.state.email}
	        				onChange={this.handleChange}
	        			/>
	        		</FormGroup>

	        		<FormGroup controlId="password">
	        			<Form.Label>Password </Form.Label>
	        			<Form.Control
	        				value={this.state.password}
	        				onChange={this.handleChange}
	        				placeholder="Password"
	        				type="password"
	        			/>
	        		</FormGroup>

	        		<Button
	        			block
	        			bsSize="large"
	        			disabled={!this.validateForm()}
	        			type="submit"
	        		>
	        			Login
	        		</Button>
	        	</form>
	        </Form>

     		</div>
     		
     	</Layout>

  	);
  }
}