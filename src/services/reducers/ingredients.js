import {
  GET_ALL_INGREDIENTS_REQUEST,
  GET_ALL_INGREDIENTS_SUCCESS,
  GET_ALL_INGREDIENTS_ERROR,
  SET_CURRENT_INGREDIENT,
  RESET_CURRENT_INGREDIENT,
  MOVE_INGREDIENT,
  ADD_BUN,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  CLEAR_INGREDIENTS
} from '../actions/ingredients';

const initialState = {
  isIngredientsRequest: false,
  isIngredientsError: false,
  ingredients: [],
  selectedIngredients: {
    bun: {},
    ingredients: []
  },
  currentIngredient: {}
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isIngredientsRequest: true,
        isIngredientsError: false
      }
    }
    case GET_ALL_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        isIngredientsRequest: false,
        isIngredientsError: false,
        ingredients: action.ingredients
      }
    }
    case GET_ALL_INGREDIENTS_ERROR: {
      return {
        ...initialState,
        isIngredientsRequest: false,
        isIngredientsError: true      
      }
    }
    case SET_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.data    
      }
    }
    case RESET_CURRENT_INGREDIENT: {
      return {
          ...state,
          currentIngredient: {}
      }
    } 
    case ADD_BUN: {
      return {
        ...state,
        selectedIngredients: {
          ...state.selectedIngredients,
          bun: action.data
        }
      }
    } 
    case ADD_INGREDIENT: {
      return {
        ...state,
        selectedIngredients: {
          ...state.selectedIngredients,
          ingredients: [...state.selectedIngredients.ingredients, action.data]
        }
      }
    } 
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        selectedIngredients: {
        ...state.selectedIngredients,
        ingredients: [...state.selectedIngredients.ingredients].filter((item) => item.id !== action.id)
        }
      }
    } 
    case MOVE_INGREDIENT: {
      const newState = [...state.selectedIngredients.ingredients]; 
      newState.splice(action.to, 0, newState.splice(action.from, 1)[0]);
      return {
        ...state,
        selectedIngredients: {
          ...state.selectedIngredients,
          ingredients: [...newState]          
        }
      }
    }
    case CLEAR_INGREDIENTS: {
      return {
        ...state,
        selectedIngredients: {
          ...state.selectedIngredients,
          ingredients: []
        }      
      }
    }
    default: {
      return state
    }
  } 
};
