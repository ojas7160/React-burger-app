import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import './ContactData.css';
import AxiosInstance from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: '',
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault(); // prevent to reload the page
        this.setState({loading: true})
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Ojas',
				address: '986 B Rani Bagh',
				phone: '99100****0',
				email: 'ojas.vwadhwa1995gmail.com',
			},
			deliveryMethod: 'Fastest'
		}

		// AxiosInstance.get('orders.json')
		// .then(res => {
		// 	console.log(res)
		// })
		// .catch(err => {
		// 	console.log(err)
		// })
		AxiosInstance.post('orders.json', order)
		.then(res => {
			console.log(res)
            this.setState({loading: false})
            this.props.history.push("/");
		})
		.catch(err => {
			console.log(err)
			this.setState({loading: false})
		})
    }

    render () {
        let form = (
            <form>
                <input className="Input" type="text" name="name" placeholder="name"/>
                <input className="Input" type="text" name="email" placeholder="email"/>
                <input className="Input" type="text" name="address" placeholder="address"/>
                <Button className="Input" btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        );
        if(this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className="ContactData">
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;