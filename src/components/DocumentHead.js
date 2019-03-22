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
      {
        // @todo #1 Add social meta tag, e.g. open graph image, etc.
      }
    </Helmet>
  )
}
