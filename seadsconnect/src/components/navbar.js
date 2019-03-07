import React, { Component } from "react"
import { Link } from "gatsby"
import { Navbar, Nav } from "react-bootstrap"
import getFirebase from "../components/firebase"
//
// export default () => (
//
//   <Navbar bg="light" varient="light" sticky="top">
//     <Navbar.Brand href="/">SEADSConnect</Navbar.Brand>
//     <Nav classname="bar">
//       <Nav.Link href="/dv-hub/">Metrics</Nav.Link>
//       <Nav.Link href="/page-2/">Sign In</Nav.Link>
//       <Nav.Link href="/page-3/">Sign Up</Nav.Link>
//     </Nav>
//   </Navbar>
// )


export default () => (
    <NavBarHandler />
)

class NavBarHandler extends Component {
  constructor(props) {
      super(props);

      this.state = {
        signedIn : getFirebase().auth().currentUser
      }
  }


  toSignOut = () => {
      if (this.state.signedIn) {
        getFirebase().auth().signOut().then(function() {
          alert("User Signed Out");
        })
      }
  }

  getData(){
      setTimeout(() => {
        this.setState({
        signedIn: getFirebase().auth().currentUser
      })
    }, 1000)
  }

  componentDidMount(){
    this.getData();
  }

  isSignedIn() {
    if (!this.state.signedIn) 
      this.state.signedIn = getFirebase().auth().currentUser;

    return this.state.signedIn ? <a class="nav-link active" href="/">Sign Out</a> :
                                 <a class="nav-link active" href="/page-2/">Sign In</a>;
  }

  getProfile() {
    if (!this.state.signedIn) 
      this.state.signedIn = getFirebase().auth().currentUser;

    return this.state.signedIn ? <a class="nav-link active" href="/profile">{getFirebase().auth().currentUser.email}</a> :
                                 <a class="nav-link active" href="/page-3/">Sign Up</a>;
  }

  render() {

      return (

        <nav class="navbar navbar-expand-sm navbar-light bg-light">
          <div class="navbar-collapse order-1 dual-collapse2">
              <ul class="navbar-nav">
                  <li class="nav-item active">
                      <a class="nav-link" href="/">SEADSConnect</a>
                  </li>
                  <li class="nav-item active">
                      <a class="nav-link" href="/dv-hub/">Metrics</a>
                  </li>
              </ul>
          </div>
          <div class="navbar-collaps order-3 dual-collapse2">
              <ul class="navbar-nav">
                  <li class="nav-item" onClick={this.toSignOut} > 
                      {this.isSignedIn()}
                  </li>
                  <li class="nav-item active">
                      {this.getProfile()}
                  </li>
              </ul>
          </div>
        </nav>
      )
    }
}
