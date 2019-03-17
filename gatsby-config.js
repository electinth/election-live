module.exports = {
  plugins: [
    "gatsby-plugin-emotion",
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Noto Sans", "Bai Jamjuree"],
        },
      },
    },
    // @todo #1 Add Analytics, e.g. Google Analytics.
    //  Check out Gatsby docs for how to add analytics
    //  - Main Guide: https://www.gatsbyjs.org/docs/adding-analytics/
    //  - Google Analytics: https://www.gatsbyjs.org/docs/adding-analytics/#using-gatsby-plugin-google-analytics
    //  - Google Tag Manager: https://www.gatsbyjs.org/packages/gatsby-plugin-google-tagmanager/
  ],
}
