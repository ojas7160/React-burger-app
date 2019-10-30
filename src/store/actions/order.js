import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id, 
    orderData: orderData
  };
}

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
}

export const purchaseBurgerStart = (orderData) => {
  return dispatch => {
    axios.post('orders.json', orderData)
		.then(res => {
      console.log(res)
      dispatch(purchaseBurgerSuccess(res.data.id, orderData))
		})
		.catch(err => {
			console.log(err)
      dispatch(purchaseBurgerFail(err))
		})
  }
}