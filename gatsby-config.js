const config = require('./src/config');

module.exports = {
  siteMetadata: {
    title: 'Shyam Yadav',
    description:
      'Shyam Yadav is a software engineer who specializes in building exceptional digital experiences.',
    siteUrl: 'https://shyamyadav.dev',
    image: '',
    twitterUsername: '@shyamyadav',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-robots-txt',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Shyam Yadav',
        short_name: 'Shyam Yadav',
        start_url: '/',
        background_color: config.colors.darkBg,
        theme_color: config.colors.bg,
        display: 'minimal-ui',
        icon: 'src/images/logo.png',
      },
    },
    // 'gatsby-plugin-offline', // disabled: incompatible with Node 18 (ReferenceError: File is not defined)
    {
      resolve: 'gatsby-source-filesystem',
      options: { name: 'images', path: `${__dirname}/src/images` },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: { name: 'content', path: `${__dirname}/content/` },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: { name: 'posts', path: `${__dirname}/content/posts` },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: { name: 'projects', path: `${__dirname}/content/projects` },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-external-links',
            options: { target: '_blank', rel: 'nofollow noopener noreferrer' },
          },
          {
            resolve: 'gatsby-remark-images',
            options: { maxWidth: 700, linkImagesToOriginal: true, quality: 90 },
          },
          { resolve: 'gatsby-remark-prismjs' },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: { trackingId: 'UA-000000-0' },
    },
  ],
};
