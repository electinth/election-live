module.exports = {
  plugins: [
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
