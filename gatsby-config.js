/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = "https://gabykaram.com",
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV
} = process.env

const isNetlifyProduction = NETLIFY_ENV === "production"
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

const dateObj = new Date();
const month = dateObj.getUTCMonth() + 1; //months from 1-12
const day = dateObj.getUTCDate();
const year = dateObj.getUTCFullYear();
const scriptHash = `${year}-${month}-${day}`;

module.exports = {
  /* Your site config here */
  siteMetadata: {
    siteUrl: siteUrl,
    title: `Gaby Karam | Digital Producer & Developer`,
    description: `I don’t find myself defined by who I am currently. I define myself by what I am looking to be.`,
    hashDate: scriptHash
  },
  plugins: [
    `gatsby-plugin-offline`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-advanced-sitemap`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`, // Needed for dynamic images
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gaby Karam | Digital Producer & Developer`,
        short_name: `Gaby Karam`,
        start_url: `/`,
        background_color: `#ffff66`,
        theme_color: `#753e6e`,
        display: `standalone`,
        icon: `src/assets/images/gaby-logo.png`,
        icon_options: {
          // For all the options available,
          // please see the section "Additional Resources" below.
          purpose: `any maskable`,
        },
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: "*" }]
          },
          "branch-deploy": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null
          },
          "deploy-preview": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null
          }
        }
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        plugins: [`gatsby-remark-images`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
              sizeByPixelDensity: true,
              showCaptions: true
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/assets/images`,
      },
    },
    // {
    //   resolve: `gatsby-plugin-csp`,
    //   options: {
    //     disableOnDev: true,
    //     reportOnly: true, // Changes header to Content-Security-Policy-Report-Only for csp testing purposes
    //     mergeScriptHashes: false,
    //     mergeStyleHashes: false,
    //     directives: {
    //       'script-src': `'self' 'unsafe-inline' data: www.googletagmanager.com googletagmanager.com www.google-analytics.com`,
    //       'style-src': `'self' 'unsafe-inline'`,
    //       'img-src': `'self' data: www.googletagmanager.com googletagmanager.com www.google-analytics.com`,
    //       'font-src': `'self' data:`,
    //       'connect-src': `'self' https://www.google-analytics.com`
    //     },
    //   }
    // },
  ]
}
