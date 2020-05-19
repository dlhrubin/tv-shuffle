import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import Search from "../components/search";
import Shuffle from "../components/shuffle";
import Results from "../components/results";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Search />
    <Shuffle />
    <Results />
  </Layout>
)

export default IndexPage
