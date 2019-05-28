import React, { Component } from "react"
import { Link } from "gatsby"
import { Navbar, Nav } from "react-bootstrap"
import getFirebase from "../components/Firebase"
// import SEADSConnectLogo from "../images/seadsconnectlogo"

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
          sessionStorage.removeItem("signedIn");
        })
      }
  }

  getData() {
    setTimeout(() => {
      this.setState({
        signedIn: this.getSignedIn()
      })
    })
  }

  getSignedIn() {
    const cachedHits = sessionStorage.getItem("signedIn");
    if (cachedHits) {
      return true;
    }
    else 
      return false;
  }

  componentDidMount() {
    this.getData();
  }

  isSignedIn() {
    if (!this.state.signedIn) 
      this.state.signedIn = this.getSignedIn();

    return this.getSignedIn() ? <a class="nav-link active" href="/">Sign Out</a> :
                                 <a class="nav-link active" href="/page-2/">Sign In</a>;
  }

  getProfile() {
    if (!this.state.signedIn) 
      this.state.signedIn = this.getSignedIn();

    return this.getSignedIn() ? <a class="nav-link active" href="/profile">Profile</a> :
                                 <a class="nav-link active" href="/page-3/">Sign Up</a>;
  }

  render() {
      this.state.signedIn = this.getSignedIn();
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
                  <li class="nav-item active">
                      <a class="nav-link" href="/training-module/">Training</a>
                  </li>    
                  <li class="nav-item active">
                      <a class="nav-link" href="/ohmDemo/">Demo</a>
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
