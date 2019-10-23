import React,  { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../Auxilury/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import AxiosInstance from '../../axios-orders';
import WithErrorHandler from '../../Auxilury/withErrorHandling/withErrorHandling';
import Spinner from '../../components/UI/Spinner/Spinner';
// import * as actionTypes from '../../store/actions/actionTypes';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
	constructor() {
		super();
		this.purchaseHandler = this.purchaseHandler.bind(this)
		this.modalCloseHandler = this.modalCloseHandler.bind(this)
		this.state = {
			purchasable: false,
			
		}
	}

	componentDidMount() {
		console.log(this.props)
		this.props.onInitIngredients()
		// AxiosInstance.get('orders.json')
		// .then(res => {
		// 	console.log(res)
		// })
		// .catch(err => {
		// 	console.log(err)
		// })

		
	}
 
	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients).map(igKey => {
			return ingredients[igKey]
		}).reduce((sum, el) => {
			return sum + el;
		}, 0);
		return sum > 0;
	}

	addIngredientsHandler = (type) => {
		const oldCount = this.props.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {...this.props.ingredients};
		updatedIngredients[type] = updatedCount;
		// const priceAddition = INGREDIENT_PRICES[type];
		// const oldPrice = this.props.totalPrice;
		// const newPrice = oldPrice + priceAddition;
		// this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
		// this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientsHandler = (type) => {
		const oldCount = this.props.ingredients[type];
		if(oldCount <= 0) return;
		const updatedCount = oldCount > 1 ? oldCount - 1 : 0
		const updatedIngredients = {...this.props.ingredients};
		updatedIngredients[type] = updatedCount;
		// const priceMinus = INGREDIENT_PRICES[type];
		// const oldPrice = this.props.totalPrice;
		// const newPrice = oldPrice - priceMinus;
		// this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
		// this.updatePurchaseState(updatedIngredients);
	}

	purchaseHandler() {
		this.setState({purchasing: true})
	}

	modalCloseHandler() {
		this.setState({purchasing: false})
	}

	purchaseContinueHandler = () => {
		this.props.history.push('/checkout')
		// const queryParams = [];
		// for(let i in this.props.ingredients) {
		// 	queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]))
		// }
		// queryParams.push("price=" + this.props.totalPrice)
		// const queryString = queryParams.join('&')
		// this.props.history.push({
		// 	pathname: '/checkout', 
		// 	search: '?' + queryString
		// });
	}


	render () {
		const disabledInfo = {...this.props.ingredients};
		let orderSummary = <OrderSummary
			price={this.props.totalPrice}
			purchaseContinue={this.purchaseContinueHandler}
			purchaseCancel={this.modalCloseHandler}
			ingredients={this.props.ingredients}
		/>
		if(this.props.error) {
			orderSummary = <Spinner/>
		}

		for(let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0 // {salad: true, meat: false ...}
		}
		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.modalCloseHandler}>
					{orderSummary}
				</Modal>
				<Burger ingredients = {this.props.ingredients}/>
					<BuildControls ordered={this.purchaseHandler} purchasable={this.updatePurchaseState(this.props.ingredients)} price={this.props.totalPrice} ingredientsAdded = {this.props.onIngredientAdd} ingredientRemoved = {this.props.onIngredientRemove} disabledInfo={disabledInfo}/>
			</Aux>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		ingredients: state.ingredients,
		totalPrice: state.totalPrice,
		error: state.error
	};
}

const mapDispatchToProps = dispatch => { 
	return {
		// onIngredientAdd: (ingredient) => dispatch({
		// 	type: actionTypes.ADD_INGREDIENT,
		// 	ingredientName: ingredient
		// }),
		// onIngredientRemove: (ingredient) => dispatch({
		// 	type: actionTypes.REMOVE_INGREDIENT,
		// 	ingredientName: ingredient
		// })
		onIngredientAdd: (ingredient) => dispatch(burgerBuilderActions.addIngredient(ingredient)),
		onIngredientRemove: (ingredient) => dispatch(burgerBuilderActions.removeIngredient(ingredient)),
		onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, AxiosInstance));