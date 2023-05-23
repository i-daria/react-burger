import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { getAllIngredients, resetCurrentIngredient } from '../../services/actions/ingredients.js';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../utils/constants';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Home, Login, Register, ForgotPassword, ResetPassword, Profile, NotFound404, Orders } from '../../pages/' 
import IngredientDetails from '../ingredient-details/ingredient-details';
import { ProtectedRouteElement } from '../protected-route-element/protected-route-element';
import Modal from '../modal/modal';

function App() {
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
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProtectedRouteElement element={<Profile />} from="/profile" />} />                
          <Route path="/profile/orders" element={<ProtectedRouteElement element={< Orders />} from="/profile/orders" />} />      
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} from="/forgot-password" />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound404 />} />               
          {background &&        
          <Route path="/ingredients/:id" element={<Modal title={'Детали ингридиента'} onClose={onClose}>
            <IngredientDetails />
          </Modal>}
          />}          
          <Route path="/ingredients/:id" element={<IngredientDetails />} />
        </Routes>
        </React.Fragment>
      </main>
    </div>
  );
}

export default App;
