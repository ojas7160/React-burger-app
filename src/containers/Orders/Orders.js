import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import Axios from '../../axios-orders';
import withErrorHandler from '../../Auxilury/withErrorHandling/withErrorHandling';

class Orders extends Component {
    state = {
        orders: [],
        loading: false
    }

    componentDidMount () {
        Axios.get('/orders.json')
        .then(res => {
            console.log(res)
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({...res.data[key], id: key})
            }
            // this.setState({orders: res})
            this.setState({loading: false, orders: fetchedOrders})
        })
        .catch(err => {
            this.setState({loading: false})
        })
    }

    render () {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, Axios);