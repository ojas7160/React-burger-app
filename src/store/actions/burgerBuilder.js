import * as actionTypes from './actionTypes';
import AxiosInstance from '../../axios-orders';

export const addIngredient = name => {
  return {
    ingredientName: name,
    type: actionTypes.ADD_INGREDIENT
  }
}

export const removeIngredient = name => {
  return {
    ingredientName: name,
    type: actionTypes.REMOVE_INGREDIENT
  }
}

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

export const initIngredients = () => {
  return dispatch => {
    AxiosInstance.get('ingredients.json')
		.then(res => {
      console.log(res)
			dispatch(setIngredients(res.data ? res.data : {salad: 0, bacon: 0, meat: 0, cheese: 0}));
		})
		.catch(err => {
			dispatch(fetchIngredientsFailed())
		});
  }
}