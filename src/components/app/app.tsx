import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { getAllIngredients, resetCurrentIngredient } from '../../services/actions/ingredients';
import { useSelector, useDispatch } from '../../services/types/hooks';
import { getIngredients } from '../../utils/constants';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Home, Login, Register, ForgotPassword, ResetPassword, Profile, NotFound404, Orders, Feed } from '../../pages' 
import IngredientDetails from '../ingredient-details/ingredient-details';
import { ProtectedRouteElement } from '../protected-route-element/protected-route-element';
import Modal from '../modal/modal';
import { Order } from '../../pages/order';
import {
  HOME_URL,
  REGISTER_URL,
  LOGIN_URL,
  PROFILE_URL,
  FORGOT_PASSWORD_URL,
  RESET_PASSWORD_URL,
  FEED_URL,
  FEED_ID_URL,
  PROFILE_ORDERS_URL,
  ORDERS_ID_URL,
  INGREDIENTS_ID_URL,
  NOT_FOUND_URL,
} from "../../utils/constants";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(getIngredients);   
  const location = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();
  const onClose = () => {
    dispatch(resetCurrentIngredient());
    navigate(-1);
  };

  React.useEffect(() => {
    dispatch(getAllIngredients());
  }, [dispatch]);

  return ( 
    ingredients &&    
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>    
      <React.Fragment>
        <Routes >
          <Route path={HOME_URL} element={<Home />} />          
          <Route path={FEED_URL} element={<Feed />} />       
          <Route path={PROFILE_URL} element={<ProtectedRouteElement element={<Profile />} from="/profile" />} />                
          <Route path={PROFILE_ORDERS_URL} element={<ProtectedRouteElement element={< Orders />} from="/profile/orders" />} />  
          <Route path={REGISTER_URL} element={<Register />} />
          <Route path={LOGIN_URL} element={<Login />} />
          <Route path={FORGOT_PASSWORD_URL} element={<ForgotPassword from="/forgot-password"/>}  />
          <Route path={RESET_PASSWORD_URL} element={<ResetPassword />} />
          <Route path={NOT_FOUND_URL} element={<NotFound404 />} />               
          {background && (
            <>
            <Route path={INGREDIENTS_ID_URL} element={ <Modal title='Детали ингридиента' onClose={onClose}><IngredientDetails /></Modal>} />
            <Route path={FEED_ID_URL} element={ <Modal title='' onClose={() => navigate(-1)}><Order /></Modal>} />               
            <Route path={ORDERS_ID_URL} element={ <Modal title='' onClose={() => navigate(-1)}><Order /></Modal>} />  
            </>       
          )}          
          <Route path={INGREDIENTS_ID_URL} element={<IngredientDetails />} />             
          <Route path={FEED_ID_URL} element={<Order />} />             
          <Route path={ORDERS_ID_URL} element={<Order />} /> 
        </Routes>
        </React.Fragment>
      </main>
    </div>
  );
}

export default App;
