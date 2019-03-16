module.exports = {
  plugins: [
    'gatsby-plugin-emotion',
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Noto Sans", "Bai Jamjuree"],
        },
      },
    },
  ],
}
