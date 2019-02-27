import React from "react"
import { Link } from "gatsby"
import { Navbar, Nav } from "react-bootstrap"
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
              <li class="nav-item">
                  <a class="nav-link active" href="/page-2/">Sign In</a>
              </li>
              <li class="nav-item active">
                  <a class="nav-link" href="/page-3/">Sign up</a>
              </li>
          </ul>
      </div>
  </nav>
)
