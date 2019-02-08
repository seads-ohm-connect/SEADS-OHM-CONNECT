import React from "react"
import { Link } from "gatsby"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import "react-tabs/style/react-tabs.css"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />


    <Tabs>
      <TabList>
      <Tab>Page 1</Tab>
      <Tab>Page 2</Tab>
      <Tab>Page 3</Tab>
      </TabList>

      <TabPanel>
        <h2>This is the homepage tab</h2>
        <p>Welcome to the SEADS & OhmConnect website</p>
        <p>This is build version 0.1</p>
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          <Image />
        </div>
      </TabPanel>
      <TabPanel>
        <h2>Link to page 2</h2>
        <Link to="/page-2/">Go to page 2</Link>
      </TabPanel>
      <TabPanel>
        <h2>Link to page 3</h2>
        <Link to="/page-3/">Go to page 3</Link>
      </TabPanel>
    </Tabs>


  </Layout>
)

export default IndexPage
