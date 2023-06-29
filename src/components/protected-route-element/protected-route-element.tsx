import { Navigate  } from 'react-router-dom';
import { useSelector } from '../../services/types/hooks';
import React from 'react';

interface IProtectedRouteElementProps {
  element: React.ReactElement;
  from?: string;
}

export const ProtectedRouteElement: React.FC<IProtectedRouteElementProps> = ({ element, from }) => {  
  const {isLogin }= useSelector(store => store.profile);
  
    return isLogin ? element : <Navigate to="/login" replace state={{ 'from': from }} />;
}