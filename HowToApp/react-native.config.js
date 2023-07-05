module.exports = {
  project: {
    ios: {},
    android: {}, // grouped into "project"
  },
  assets: ['./src/assets/fonts'], // stays the same
  dependencies: {
    '@alentoma/react-native-selectable-text': {
      platforms: {
        android: null, // disable Android platform, other platforms will still autolink if provided,
        ios: null, // disable IOS platform, other platforms will still autolink if provided
      },
    },
  },
};
