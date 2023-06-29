import { useSelector } from '../types/hooks';
import { postOrderToServer} from '../../utils/api';
import { AppDispatch, AppThunk } from "../types"; 
import { getSelectedIngredients } from '../../utils/constants';

//отправить заказ на сервер
export const POST_ORDER_REQUEST: 'POST_ORDER_REQUEST' = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS: 'POST_ORDER_SUCCESS' = 'POST_ORDER_SUCCESS';
export const POST_ORDER_ERROR: 'POST_ORDER_ERROR' = 'POST_ORDER_ERROR';

interface IPostOrder {
  readonly type: typeof POST_ORDER_REQUEST,
}
interface IPostOrderSuccess {
  readonly type: typeof POST_ORDER_SUCCESS;
  readonly name: string;
  readonly number: number | null;  
}
interface IPostOrderError {
  readonly type: typeof POST_ORDER_ERROR,
}

export type TOrderActions = | IPostOrder
  | IPostOrderSuccess
  | IPostOrderError;

export const postOrder: AppThunk = () => {
  return (dispatch: AppDispatch) => {
    const selectedIngredients = useSelector(getSelectedIngredients);
    if (typeof selectedIngredients.bun === 'undefined') {      
      throw new Error ('Error - No buns in order');
    } else {
      const selectedIngredientsIds: string[] =  [selectedIngredients.bun._id, ...selectedIngredients?.ingredients.map(elem => elem._id), selectedIngredients.bun._id];
      dispatch ({
        type: POST_ORDER_REQUEST
      });
      postOrderToServer(selectedIngredientsIds).then(res => {
        if (res && res.success)  {
          dispatch ({
            type: POST_ORDER_SUCCESS,
            name: res.data.name,
            number: res.data.number,
          });
        } else {
          dispatch ({
            type: POST_ORDER_ERROR
          });
        }
      }
      )
      .catch(err => {
        dispatch ({
          type: POST_ORDER_ERROR
        });
      }); 
    }
  }
};