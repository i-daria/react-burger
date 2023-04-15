import { useSelector } from 'react-redux';
import { postOrderToServer} from '../../utils/api';

//отправить заказ на сервер
export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_ERROR = 'POST_ORDER_ERROR';

export const postOrder = () => {
  return (dispatch) => {
    const selectedIngredients = useSelector(store => store.selectedIngredients);
    dispatch ({
      type: POST_ORDER_REQUEST
    })
    postOrderToServer(selectedIngredients).then(res => {
      if (res && res.success)  {
        dispatch ({
          type: POST_ORDER_SUCCESS,
          order: res.data
        });
      } else {
        dispatch ({
          type: POST_ORDER_ERROR
        });
      }
    })
    .catch(err => {
      dispatch ({
        type: POST_ORDER_ERROR
      });
    });  
  }
};