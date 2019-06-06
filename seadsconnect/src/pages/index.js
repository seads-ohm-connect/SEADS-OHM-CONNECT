import React from "react"
import { Link } from "gatsby"
import 'bootstrap/dist/css/bootstrap.css'
import "react-tabs/style/react-tabs.css"

import Layout from "../components/layout"
import Image from "../components/image"
import HomeCard from "../components/Home/home"
import Tips from "../components/Tips/tips"

import getFirebase, { FirebaseContext } from '../components/Firebase'
//Main page of SEADSConnect webApp. When SEADSConnect is first started up this
//is the page that is loaded. All the contents of this page can be found in more
//detail in the locations describe in the middle 4 import statements above.
//the ../ is needed to back out of the pages folder, and go far enough up the
//file structure to then reference the components folder 
const IndexPage = () => (
	<FirebaseContext.Provider value={getFirebase()}>
    <Layout>
	  <p />
      <HomeCard />
      <Tips />
    </Layout>
    </FirebaseContext.Provider>
)

export default IndexPage
