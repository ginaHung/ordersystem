/* eslint-disable import/prefer-default-export */
import * as HttpService from './HttpService';

export const verify = (data) => HttpService.post('login/verify', data);
export const logout = (data) => HttpService.post('azure/logout', data);

export const getMyOrder = (data) => HttpService.post('order/getMyOrder', data);
export const getAllOrderList = (data) => HttpService.post('order/getAllOrderList', data);

// export const getMyOrder = (data) => HttpService.post('order/getOrderList', data);
// export const saveMyOrder = (data) => HttpService.post('order/getOrderList', data);
// export const saveMyOrderRow = (data) => HttpService.post('order/getOrderList', data);
// export const deleteMyOrderRow = (data) => HttpService.post('order/getOrderList', data);
