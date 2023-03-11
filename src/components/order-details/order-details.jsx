import styles from './order-details.module.css';
import doneImg from '../../images/done.png';

function OrderDetails() {
  return (
    <div className={styles.content}>
      <h1 className={`${styles.heading} mt-9 mb-8`}>034536</h1>
      <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>      
      <img src={doneImg} alt='заказ оформлен' className={styles.img} />
      <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive mb-20'>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}

export default OrderDetails;