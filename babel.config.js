module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'babel-plugin-macros',
    'react-native-paper/babel',
    ['module:react-native-dotenv', { safe: true }],
    'react-native-reanimated/plugin',
  ],
};
