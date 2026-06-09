import { Route, Redirect, RouteProps } from 'react-router-dom';

interface AdminRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!token) return <Redirect to="/login" />;
        if (usuario.rol !== 'admin') return <Redirect to="/home" />;
        return <Component {...props} />;
      }}
    />
  );
};

export default AdminRoute;