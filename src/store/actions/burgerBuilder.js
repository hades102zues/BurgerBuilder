import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingName) =>{
	return {
		type:actionTypes.ADD_INGREDIENTS,
		ingredientName : ingName
	};
};

export const removeIngredient = (ingName) =>{
	return {
		type:actionTypes.DEL_INGREDIENTS,
		ingredientName : ingName
	};
};

export const setIngredients = (ingredients) =>{
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients
	};
};

export const fetchIngredientsFailed = () =>{
	return {
		type:actionTypes.FECTH_INGREDIENTS_FAILED
	};
};

export const initIngredient = () =>{
	return dispatch => {
		axios.get('Ingredients.json')
       .then( response =>{
       		dispatch(setIngredients(response.data));
         })
       .catch(err => {
       	    dispatch(fetchIngredientsFailed());
       });
	};
};