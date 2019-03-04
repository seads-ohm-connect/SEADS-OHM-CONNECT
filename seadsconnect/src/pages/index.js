import React from "react"
import ReactDOM from "react-dom"
import { Link } from "gatsby"
import 'bootstrap/dist/css/bootstrap.css'
import "react-tabs/style/react-tabs.css"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import HomeCarousel from "../components/hp-carousel"
import getFirebase, { FirebaseContext } from '../components/Firebase'


const IndexPage = () => (
	<FirebaseContext.Provider value={getFirebase()}>
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <HomeCarousel />
    </Layout>
    </FirebaseContext.Provider>
)

export default IndexPage
