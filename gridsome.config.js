// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Gridsome Country Card from Externals",
  siteDescription:
    "A simple way to demonstrate power of static rendering, which cause a page to be preloaded with data.",

  templates: {
    Post: "/:title",
    Tag: "/tag/:id",
    Experiment: "/experiments/:title",
  },

  plugins: [
    {
      // Create posts from markdown files
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "Post",
        path: "content/posts/*.md",
        refs: {
          // Creates a GraphQL collection from 'tags' in front-matter and adds a reference.
          tags: {
            typeName: "Tag",
            create: true,
          },
        },
      },
    },
    {
      // Adding Experiments folder
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "Experiment",
        path: "content/experiments/*.md",
        refs: {
          // Creates a GraphQL collection from 'tags' in front-matter and adds a reference.
          tags: {
            typeName: "Tag",
            create: false,
          },
        },
      },
    },
  ],

  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: "_blank",
      externalLinksRel: ["nofollow", "noopener", "noreferrer"],
      anchorClassName: "icon icon-link",
      plugins: ["@gridsome/remark-prismjs"],
    },
  },
};
