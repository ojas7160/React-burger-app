import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import './ContactData.css';
import AxiosInstance from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your Phone'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'your email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
                valid: true,
                touched: false
            }
        },
        loading: false,
        formIsValid: false
    }
    
    checkValidity (value, rules) {
        let isValid = false;

        if(rules.required) {
            isValid = value.trim() !== '';
        }
        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault(); // prevent to reload the page
        this.setState({loading: true})
        const formData = {}
        for(let form in this.state.orderForm) {
            formData[form] = this.state.orderForm[form].value
        }
		const order = {
			ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData 
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

    inputChangeHandler = (event, inputIdentifier) => {
        console.log("TCL: ContactData -> inputChangeHandler -> inputIdentifier", inputIdentifier)
        console.log(event.target.value)
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]}
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render () {
        const formElementArray = [];
        for(let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => (
                    <Input changed={(event) => this.inputChangeHandler(event, formElement.id)} key={formElement.id} elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig} value={formElement.config.value} shouldValidate={formElement.config.validation} invalid={!formElement.config.valid} touched={formElement.config.touched}/>
                ))}
                <Button className="Input" btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
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