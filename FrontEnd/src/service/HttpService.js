/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { defaultConfig } from '../utils/env';

axios.defaults.withCredentials = true;


export const post = async (url, param, config) => axios({
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
  },
  url: `${defaultConfig.api_url}${url}`,
  data: param,
  ...config,
}).then((x) => {
  return x;
});
