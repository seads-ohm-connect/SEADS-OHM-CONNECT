import React, { Component } from "react"
import { Link } from "gatsby"
import { Navbar, Nav, Button} from "react-bootstrap"
import getFirebase from "../components/firebase"
import SEADSConnectLogo from "../images/SEADSConnectLogo.png"

export default () => (
    <NavBarHandler />
)

class NavBarHandler extends Component {
  constructor(props) {
      super(props);

  }


  toSignOut = () => {
      if (this.getSignedIn()) {
        getFirebase().auth().signOut().then(function() {
          sessionStorage.removeItem("signedIn");
        })
      }
  }

  getSignedIn() {
    const cachedHits = sessionStorage.getItem("signedIn");
    return cachedHits;
  }

  render() {

      return (

       <Navbar bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="/"> 
        <img
          src={SEADSConnectLogo}
          alt="SEADSConnect Logo"
          style={{
            height: "40px",
            width: "40px",
            left: "0px",
            top: "10px",
            position: "relative"
          }}
        />
        SEADSConnect</Navbar.Brand> 
        <Nav className="mr-auto">
          <Nav.Link href="/dv-hub/">Metrics</Nav.Link>
          <Nav.Link href="/training-module/">Training</Nav.Link>
        </Nav>
        <Nav>
          {this.getSignedIn() ? <Nav.Link href="/" onClick={this.toSignOut}>Sign Out</Nav.Link> :
                                                              <Nav.Link href="/page-2/">Sign In</Nav.Link>};

          {this.getSignedIn() ? <Nav.Link href="/profile">Profile</Nav.Link> :
                                    <Nav.Link href="/page-3/">Sign Up</Nav.Link>};
        </Nav>
      </Navbar> 
       
      );
  }
}
