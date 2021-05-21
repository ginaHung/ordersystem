/* eslint-disable import/prefer-default-export */
import * as HttpService from './HttpService';

export const verify = (data) => HttpService.post('login/verify', data);
export const logout = (data) => HttpService.post('azure/logout', data);

export const getMyOrder = (data) => HttpService.post('order/getMyOrder', data);
export const getAllOrderList = (data) => HttpService.post('order/getAllOrderList', data);

export const getOrderData = (data) => HttpService.post('order/getOrderData', data);
export const getOrderItem = (data) => HttpService.post('order/getOrderItem', data);

export const saveOrder = (data) => HttpService.post('order/saveOrder', data);
export const saveRow = (data) => HttpService.post('order/saveRow', data);
export const deleteOrder = (data) => HttpService.post('order/deleteOrder', data);
