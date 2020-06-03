module.exports = {
  siteMetadata: {
    title: 'TV Shuffle',
    description: 'Randomly select an episode of your favorite show to watch',
    author: 'Danielle Rubin',
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'TV Shuffle',
        short_name: 'TV Shuffle',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'minimal-ui',
        icon: 'src/images/dice-logo.png',
      },
    },
    'gatsby-plugin-offline',
  ],
};
