import React from "react"
import { Link } from "gatsby"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'bootstrap/dist/css/bootstrap.css'
import "react-tabs/style/react-tabs.css"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import HomeCarousel from "../components/hp-carousel"

import Firebase, { FirebaseContext } from '../components/Firebase'

const IndexPage = () => (
  <FirebaseContext.Provider value={new Firebase()}>
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <HomeCarousel />
    </Layout>
  </FirebaseContext.Provider>
)

export default IndexPage
