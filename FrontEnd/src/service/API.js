/* eslint-disable import/prefer-default-export */
import * as HttpService from './HttpService';

export const verify = (data) => HttpService.post('login/verify', data);
