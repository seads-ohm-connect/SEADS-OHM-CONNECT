import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import NavBar from "./navbar"


import firebase from '../components/Firebase'

import getFirebase, { FirebaseContext } from '../components/Firebase'

//Layout form that can be used in each of the pages.
//This can be altered to have any webApp background desired.
//If changed, each page that has layout included in its render will see the
//effect of the change.

//Any UI changes that are intended to be applied to all pages in the app,
//i.e the navigation bar, should be included and placed inside the render.

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
        {/* <Header siteTitle={data.site.siteMetadata.title} /> */}

        <NavBar />
        <div style={{backgroundColor: "aliceblue"}}>
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 100,
          }}
        >
        
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built by
            {` `}
            <a href="https://www.soe.ucsc.edu/people/mantey">The Mantey Gang</a>
          </footer>
        </div>
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
