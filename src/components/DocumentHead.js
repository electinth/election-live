import React from "react"
import { Helmet } from "react-helmet"

export default function DocumentHead() {
  return (
    <Helmet
      link={[
        {
          rel: "shortcut icon",
          type: "image/x-icon",
          href: "https://elect.in.th/wp-content/uploads/2018/10/favicon.ico",
        },
      ]}
    >
      <title>ELECT LIVE</title>
    </Helmet>
  )
}
