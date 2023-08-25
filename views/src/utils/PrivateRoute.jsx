import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../app/features/auth/authSlice';
import { toast } from 'react-hot-toast';

const PrivateRoute = () => {
  const userInfo = useSelector(selectUserInfo);
  useEffect(() => {
    if (!userInfo) {
      toast('Please Login', {
        icon: 'ℹ️',
      });
    }
  }, []);

  return userInfo ? <Outlet /> : <Navigate to='/sign-in' replace />;
};

export default PrivateRoute;
