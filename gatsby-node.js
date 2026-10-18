const path = require('path');

// Polyfill global File for gatsby-transformer-remark on Node 18
// (the plugin references `File` which isn't a global in Node < 20)
if (typeof globalThis.File === 'undefined') {
  globalThis.File = class File {
    constructor(bits, name, options = {}) {
      this.bits = bits;
      this.name = name;
      this.type = options.type || '';
    }
  };
}

// Explicitly define all frontmatter fields and the MarkdownRemark type
// so GraphQL never throws "field not defined" errors.
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter
      html: String
    }
    type MarkdownRemarkFrontmatter {
      title:          String
      date:           Date @dateformat
      slug:           String
      description:    String
      company:        String
      location:       String
      range:          String
      url:            String
      github:         String
      external:       String
      tech:           [String]
      showInProjects: Boolean
    }
  `);
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve('src/templates/post.js');

  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/posts/" } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  const posts = result.data.postsRemark.edges;
  posts.forEach(({ node }) => {
    if (node.frontmatter.slug) {
      createPage({
        path: node.frontmatter.slug,
        component: postTemplate,
        context: {
          slug: node.frontmatter.slug,
        },
      });
    }
  });
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          { test: /scrollreveal/, use: loaders.null() },
          { test: /animejs/,      use: loaders.null() },
        ],
      },
    });
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@config':     path.resolve(__dirname, 'src/config'),
        '@hooks':      path.resolve(__dirname, 'src/hooks'),
        '@images':     path.resolve(__dirname, 'src/images'),
        '@pages':      path.resolve(__dirname, 'src/pages'),
        '@styles':     path.resolve(__dirname, 'src/styles'),
        '@utils':      path.resolve(__dirname, 'src/utils'),
      },
    },
  });
};
