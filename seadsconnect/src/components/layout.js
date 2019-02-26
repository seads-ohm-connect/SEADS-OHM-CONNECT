import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import NavBar from "./nav-bar"

import Header from "./header"
import "./layout.css"
import Navbar from "./navbar"


import firebase from '../components/firebase'

import getFirebase, { FirebaseContext } from '../components/Firebase'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
      <FirebaseContext.Provider value={getFirebase()}>
        <Header siteTitle={data.site.siteMetadata.title} />

        <NavBar />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built by
            {` `}
            <a href="https://www.soe.ucsc.edu/people/mantey">The Mantey Gang</a>
          </footer>
        </div>
        </FirebaseContext.Provider>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
