import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRouteElement = ({ element, from }) => {  
  const {isLogin }= useSelector(store => store.profile);
  
    return isLogin ? element : <Navigate to="/login" replace state={{ 'from': from }} />;
}