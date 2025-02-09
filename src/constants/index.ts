import ExpoConstants from 'expo-constants';

import PackageJson from '../../package.json';

// All urls for all environments
export const Urls = {
  ApiUrl: 'https://calendar.api.jacksenyitko.com',
};

const Constants = {
  /**
   * The version of the app
   */
  version: `${ExpoConstants.expoConfig?.version}-${PackageJson.updateVersion}`,
};

export default Constants;
