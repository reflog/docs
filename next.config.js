// Introduce MDX into the build
const withMDX = require('@zeit/next-mdx')({
  extension: /\.(md|mdx)?$/
})

module.exports = withMDX({
  // Allow mdx and md files to be pages
  pageExtensions: ['jsx', 'js', 'mdx', 'md'],

  // By default we don't have any assetPrefix.
  // This is because we need to support PR based static deployments
  // But for multi-zones suppport we are running a custom proxy which adds
  // multi-zones support.
  assetPrefix: ''
})
