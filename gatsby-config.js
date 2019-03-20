module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-emotion",
    },
    {
      resolve: "gatsby-plugin-react-helmet",
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: [
            "Libre Baskerville:400,400i,700",
            "Noto Sans:400,700",
            "Bai Jamjuree:400,600",
          ],
        },
      },
    },
    {
      resolve: "gatsby-plugin-layout",
      options: {
        component: require.resolve(`./src/components/PageLayout`),
      },
    },

    // @todo #1 Add Analytics, e.g. Google Analytics.
    //  Check out Gatsby docs for how to add analytics
    //  - Main Guide: https://www.gatsbyjs.org/docs/adding-analytics/
    //  - Google Analytics: https://www.gatsbyjs.org/docs/adding-analytics/#using-gatsby-plugin-google-analytics
    //  - Google Tag Manager: https://www.gatsbyjs.org/packages/gatsby-plugin-google-tagmanager/

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "ELECT LIVE",
        short_name: "ELECT LIVE",
        start_url: "/",
        background_color: "#6b37bf",
        theme_color: "#6b37bf",
        display: "standalone",
        icon: "src/styles/images/site-logo.png",
      },
    },

    // @todo #1 Add `gatsby-plugin-netlify` for Netlify headers.
    //  (see: https://www.gatsbyjs.org/packages/gatsby-plugin-netlify/)

    {
      resolve: "gatsby-plugin-htaccess",
    },
  ],
}
