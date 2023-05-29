import { Navigate, Outlet, useLocation } from 'react-router-dom';
const PrivateRoutes = ({allowedRoles}) => {
  const location = useLocation();
  const userRoles = ['admin'];

  return (
    userRoles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : userRoles
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoutes;