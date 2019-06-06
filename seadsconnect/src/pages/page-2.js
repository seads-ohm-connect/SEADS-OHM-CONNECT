import React, { Component } from "react";
import { Button, FormGroup, Form } from "react-bootstrap";
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import DragGraph from "../Graphs/DragGraph/drag-graph"

import { FirebaseContext } from '../components/Firebase'
import { withFirebase } from '../components/Firebase'
import getFirebase from '../components/Firebase'


//Page-2 is the signIn page for SEADSConnect. Checks login credentials un,
//validateForm and then handleSubmit. If log in is successfull, the users
//login will change the format of the navigation bar at the top to
//remove the signIn page option, and replace it with SignOut and Profile.
//The user will still be on this page after the signIn is successfull.
//Page switching after successfull log in was not implemented by the end of
//the first itteration of this project.
//SignOut is handled in the NavBar component.  

const SignInPage = () => (
  <React.Fragment>
  <LoginForm />
  </ React.Fragment>
);

const INITIAL_STATE = {
	email: "",
    password: ""
}

class LoginFormBase extends Component {
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

    getFirebase().auth()
   	 .signInWithEmailAndPassword(email, password)
     .then(() => {
       this.setState({ ...INITIAL_STATE });
       sessionStorage.setItem("signedIn", JSON.stringify(true));
       this.context.router.history.push("/")
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

const LoginForm = withFirebase(LoginFormBase);

export default SignInPage;

export { LoginForm };
