import AdminPage from '../pages/AdminPage'
import LoginPage from '../pages/LoginPage'
import UserPage from '../pages/UserPage'
import RequireAuth from './RequireAuth'

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const RouterComponent = () => {
    
  return (
    <Router>
      <Routes>
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["user"]} />}>
          <Route path="/user" element={<UserPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<h1>You don't have permissions to see this page.</h1>} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </Router>
  );
}

export default RouterComponent;