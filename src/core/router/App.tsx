import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';

import Login from '../../features/auth/presentation/screens/Login';
import Home from '../../features/home/presentation/screen/Home';
import Tramites from '../../features/tramites/presentation/screens/Tramites';
import Horarios from '../../features/reservas/presentation/screens/Horarios';
import Detalle from '../../features/tramites/presentation/screens/Detalle';
import Register from '../../features/auth/presentation/screens/Register';
import ClaveUnica from '../../features/auth/presentation/screens/ClaveUnica';
import Oficinas from '../../features/oficinas/presentation/screens/Oficinas';
import PrivateRoute from './PrivateRoute';
import DetalleReserva from '../../features/reservas/presentation/screens/DetalleReserva';
import AdminRoute from './AdminRoute';
import AdminPanel from '../../features/admin/presentation/screens/AdminPanel';
import AdminOficinas from '../../features/admin/presentation/screens/AdminOficinas';
import MisReservas from '../../features/reservas/presentation/screens/MisReservas';




/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import "/src/core/theme/variables.css";


setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>     

        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/clave-unica" component={ClaveUnica} exact/>
        <Route exact path="/" render={() => <Redirect to="/login" />} />


        <PrivateRoute path="/home" component={Home} exact />

        <PrivateRoute path="/tramites" component={Tramites} exact />

        <PrivateRoute path="/oficinas" component={Oficinas} exact/>

        <PrivateRoute path="/detalle/:id" component={Detalle} exact />

        <PrivateRoute path="/horarios/:id" component={Horarios} exact />
        
        <PrivateRoute path="/reserva/:id" component={DetalleReserva} exact/>

        <AdminRoute path="/admin" component={AdminPanel} exact />

        <AdminRoute path="/admin/oficinas" component={AdminOficinas} exact />

        <PrivateRoute path="/mis-reservas" component={MisReservas} exact />

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;