module.exports = {
  siteMetadata: {
    title: 'SkimpyList',
    author: 'lnicmats',
    description: 'Fan & Creator Social Community.',
    siteUrl: 'https://anandamritraj.in',
    social: {
      twitter: '@anamritraj',
    },
  },
  pathPrefix: '/',
  plugins: [
    {
      resolve:"@babel/plugin-transform-regenerator",
      options: {
        "asyncGenerators": false,
        "generators": true,
        "async": false
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
   
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-83719221-5`,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `SkimpyList`,
        short_name: `SkimpyList`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#d23636`,
        display: `standalone`,
        icon: `src/assets/icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    'gatsby-plugin-offline',
    `gatsby-plugin-material-ui`,

    // {
    //   resolve: `gatsby-plugin-react-redux`,
    //   options: {
    //     // [required] - path to your createStore module
    //     pathToCreateStoreModule: './src/state/createStore',
    //     // [optional] - options passed to `serialize-javascript`
    //     // info: https://github.com/yahoo/serialize-javascript#options
    //     // will be merged with these defaults:
    //     serialize: {
    //       space: 0,
    //       // if `isJSON` is set to `false`, `eval` is used to deserialize redux state,
    //       // otherwise `JSON.parse` is used
    //       isJSON: true,
    //       unsafe: false,
    //       ignoreFunction: true,
    //     },
    //     // [optional] - if true will clean up after itself on the client, default:
    //     cleanupOnClient: true,
    //     // [optional] - name of key on `window` where serialized state will be stored, default:
    //     windowKey: '__PRELOADED_STATE__',
    //   },
    // },
    {
      resolve: `gatsby-plugin-react-redux-persist`,
      options: {
        // [required] - path to your createStore module
        pathToCreateStoreModule: './src/state/createStore',
        // [optional] - options passed to `serialize-javascript`
        // info: https://github.com/yahoo/serialize-javascript#options
        // will be merged with these defaults:
        serialize: {
          space: 0,
          // if `isJSON` is set to `false`, `eval` is used to deserialize redux state,
          // otherwise `JSON.parse` is used
          isJSON: true,
          unsafe: false,
          ignoreFunction: true,
        },
        // [optional] - if true will clean up after itself on the client, default:
        cleanupOnClient: false,
        // [optional] - name of key on `window` where serialized state will be stored, default:
        windowKey: '__PRELOADED_STATE__',
      },
    },
   
    
  ],
}
