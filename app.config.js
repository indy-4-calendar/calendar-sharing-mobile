const packageFile = require('./package.json');

export default {
  expo: {
    name: 'DayLink',
    slug: 'calendar-sharing',
    version: packageFile.version,
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'daylink',
    userInterfaceStyle: 'light',
    newArchEnabled: false,
    ios: {
      usesAppleSignIn: true,
      supportsTablet: false,
      bundleIdentifier: 'com.calendarsharing',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    plugins: [
      'expo-apple-authentication',
      'expo-router',
      [
        'expo-splash-screen',
        {
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#1F2937',
          image: './assets/images/splash-icon.png',
        },
      ],
      'expo-font',
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: '287fe2aa-0083-44a1-a380-2f97d727547d',
      },
    },
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
};
