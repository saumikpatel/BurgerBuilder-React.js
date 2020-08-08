import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const addIngredient= (name)=>{
    return{
        ingredientName:name,
        type:actionTypes.ADD_INGREDIENT
    }
}

export const removeIngredient= (name)=>{
    return{
        ingredientName:name,
        type:actionTypes.REMOVE_INGREDIENT
    }
}


export const setIngredients =(ingredients)=>{
    return{
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    }
}

export const fetchIngedientsFailed=()=>{
    return{
        type:actionTypes.FETCH_INGREDIENTS_FAILED

    }
    
}


export const initIngredients= ()=>{
    return dispatch => {
         axios.get('https://react-my-burger-acb29.firebaseio.com/ingredients.json')
        .then(response =>{
            dispatch(setIngredients(response.data))
            

        }).catch(error=>{
            dispatch(fetchIngedientsFailed())

            

        })

    }
}