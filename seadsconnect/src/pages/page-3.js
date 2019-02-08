import React from "react"
import { Link } from "gatsby"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import "react-tabs/style/react-tabs.css"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ThirdPage = () => (
  <Layout>
    <SEO title="Third page with Tabs" />
    <h1>Third page created by Austin</h1>
    <Tabs>
      <TabList>
        <Tab>Page 1</Tab>
        <Tab>Page 2</Tab>
      </TabList>

      <TabPanel>
        <h2>Link to page 1</h2>
        <Link to="/">Go back to homepage</Link>
      </TabPanel>
      <TabPanel>
        <h2>Link to second page</h2>
        <Link to="/page-2/">Go back to page 2</Link>
      </TabPanel>
    </Tabs>
  </Layout>
  // <Layout>
  //   <SEO title="Third Page" />
  //   <h1>Third page created by Austin</h1>
  //   <p>This is a test to see how pages work</p>
  //   <Link to="/">Go back to the homepage</Link>
  // </Layout>
)

export default ThirdPage
