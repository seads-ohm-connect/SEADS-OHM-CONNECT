import React from "react"
import { Link } from "gatsby"
import { Navbar, Nav } from "react-bootstrap"

export default () => (

  <Navbar bg="light" varient="light" sticky="top">
    <Navbar.Brand href="/">SEADSConnect</Navbar.Brand>
    <Nav classname="bar">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/page-2/">Sign In</Nav.Link>
      <Nav.Link href="/page-3/">Sign Up</Nav.Link>
    </Nav>
  </Navbar>
)
