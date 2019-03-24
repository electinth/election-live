import React from "react"
import { Helmet } from "react-helmet"

import metaBanner from "../styles/images/meta-banner.png"

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
      <meta
        name="description"
        content="ดูผลการเลือกตั้งแบบเรียลไทม์ได้ที่นี่"
      />
      <meta name="image" content={metaBanner} />
      <meta itemprop="name" content="ELECT LIVE" />
      <meta
        itemprop="description"
        content="ดูผลการเลือกตั้งแบบเรียลไทม์ได้ที่นี่"
      />
      <meta itemprop="image" content={metaBanner} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="ELECT LIVE" />
      <meta
        name="twitter:description"
        content="ดูผลการเลือกตั้งแบบเรียลไทม์ได้ที่นี่"
      />
      <meta name="og:title" content="ELECT LIVE" />
      <meta
        name="og:description"
        content="ดูผลการเลือกตั้งแบบเรียลไทม์ได้ที่นี่"
      />
      <meta name="og:url" content="https://elect.thematter.co/" />
      <meta name="og:site_name" content="ELECT LIVE" />
      <meta name="og:locale" content="th_TH" />
      <meta name="og:type" content="website" />
    </Helmet>
  )
}
