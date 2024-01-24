// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config")

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

let resolverMainFields = config.resolver.resolverMainFields || []
if (process.env.BACKEND_STORAGE === "MOCK") {
  resolverMainFields = ["__mockBrowser", ...resolverMainFields]
}

module.exports = {
  ...config,
  resolver: {
    ...config.resolver,
    resolverMainFields,
  },
}
