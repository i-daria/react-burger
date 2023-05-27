import stylesProfile from './profile.module.css';
import styles from './orders.module.css';
import { ProfileNav } from '../components/profile-nav/profile-nav';
import { FeedOrder } from '../components/feed-order/feed-order';

export const Orders = () => {
  return (
    <div className={stylesProfile.container}>
      <ProfileNav />
      <div className={styles.ordersContainer}>       
          <FeedOrder />
          <FeedOrder />
          <FeedOrder />
          <FeedOrder />
          <FeedOrder />
        </div>
    </div>
  );
}