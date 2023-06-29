import styles from './order-details.module.css';
import doneImg from '../../images/done.png';
import { useSelector } from '../../services/types/hooks';
import { getIsOrderRequest, getOrder } from '../../utils/constants';

const OrderDetails: React.FC = () => {
  const order = useSelector(getOrder);
  const isOrderRequest = useSelector(getIsOrderRequest);
  return (
    <div className={styles.content}>
      {isOrderRequest ? <h1 className='text text_type_main-medium mb-15'> Loading...</h1> : (
      <>
        <h1 className={`${styles.heading} mt-9 mb-8`}>{order.number}</h1>
        <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>      
        <img src={doneImg} alt='заказ оформлен' className={styles.img} />
        <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
        <p className='text text_type_main-default text_color_inactive mb-20'>Дождитесь готовности на орбитальной станции</p>
      </>
      )}
    </div>
  );
}

export default OrderDetails;