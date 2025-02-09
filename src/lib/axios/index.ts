import Axios from 'axios';

import { Urls } from '@/constants';

const axios = Axios.create({
  baseURL: `${Urls.ApiUrl}/api/v1`,
});

export default axios;
