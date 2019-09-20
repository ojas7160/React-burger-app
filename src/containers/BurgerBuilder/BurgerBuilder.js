import React,  { Component } from 'react';
import Aux from '../../Auxilury/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
	salad: 1, 
	meat: 2, 
	bacon: 0.5,
	cheese: 3
};

class BurgerBuilder extends Component {
	constructor() {
		super();
		this.purchaseHandler = this.purchaseHandler.bind(this)
		this.modalCloseHandler = this.modalCloseHandler.bind(this)
		this.state = {
			ingredients : {
				meat: 0,
				cheese: 0,
				bacon: 0,
				salad: 0
			},
			purchasable: false,
			totalPrice: 4,
			purchasing: false
		}
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients).map(igKey => {
			return ingredients[igKey]
		}).reduce((sum, el) => {
			return sum + el;
		}, 0);
		this.setState({purchasable: sum > 0});
	}

	addIngredientsHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {...this.state.ingredients};
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientsHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if(oldCount <= 0) return;
		const updatedCount = oldCount > 1 ? oldCount - 1 : 0
		const updatedIngredients = {...this.state.ingredients};
		updatedIngredients[type] = updatedCount;
		const priceMinus = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceMinus;
		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
		this.updatePurchaseState(updatedIngredients);
	}

	purchaseHandler() {
		this.setState({purchasing: true})
	}

	modalCloseHandler() {
		this.setState({purchasing: false})
	}

	render () {
		const disabledInfo = {...this.state.ingredients};
		for(let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0 // {salad: true, meat: false ...}
		}
		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.modalCloseHandler}>
					<OrderSummary ingredients={this.state.ingredients}/>
				</Modal>
				<Burger ingredients = {this.state.ingredients}/>
					<BuildControls ordered={this.purchaseHandler} purchasable={this.state.purchasable} price={this.state.totalPrice} ingredientsAdded = {this.addIngredientsHandler} ingredientRemoved = {this.removeIngredientsHandler} disabledInfo={disabledInfo}/>
			</Aux>
		)
	}
}
export default BurgerBuilder;