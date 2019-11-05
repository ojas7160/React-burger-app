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

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
}

export const purchaseBurger = (orderData) => {
  return dispatch => {
    dispatch(purchaseBurgerStart())
    axios.post('orders.json', orderData)
		.then(res => {
      console.log(res)
      dispatch(purchaseBurgerSuccess(res.data.name, orderData))
		})
		.catch(err => {
			console.log(err)
      dispatch(purchaseBurgerFail(err))
		})
  }
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

export const fetchOrdersFail = (err) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: err
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart())
    axios.get('/orders.json')
    .then(res => {
        console.log(res)
        const fetchedOrders = [];
        for (let key in res.data) {
            fetchedOrders.push({...res.data[key], id: key})
        }
        dispatch(fetchOrdersSuccess(fetchedOrders))
        // this.setState({orders: res})
        // this.setState({loading: false, orders: fetchedOrders})
    })
    .catch(err => {
      dispatch(fetchOrdersFail(err))
    })
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}