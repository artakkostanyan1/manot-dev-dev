import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ImportData from './pages/ImportData/ImportData';
import Main from './pages/Main/Main';
import Registration from './pages/Registration/Registration';
import Verification from './pages/Verification/Verification';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import LogIn from './pages/LogIn/LogIn';
import Payment from './pages/Payment/Payment';
import Profile from './pages/Profile/Profile';
import Upgrade from './pages/Upgrade/Upgrade';
import Desktop from './pages/Desktop/Desktop';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail';
import Email from './pages/Email/Email';

import paths from './utils/routing';
import './App.css';

const NoMatchPage = () => {
  return <h3>404 - Not found</h3>;
};

const routes = [
  {
    path: paths.Main,
    exact: true,
    private: false,
    component: Main,
  },
  {
    path: paths.Importdata,
    exact: true,
    private: false,
    component: ImportData,
  },
  {
    path: paths.ResetPassword,
    exact: true,
    private: false,
    component: ResetPassword,
  },
  {
    path: paths.OldVerification,
    exact: true,
    private: false,
    component: Verification,
  },
  {
    path: paths.Login,
    exact: true,
    private: false,
    component: LogIn,
  },
  {
    path: paths.Verify,
    exact: true,
    private: false,
    component: VerifyEmail,
  },
  {
    path: paths.Email,
    exact: true,
    private: false,
    component: Email,
  },
  {
    path: paths.Profile,
    exact: true,
    private: false,
    component: Profile,
  },
  {
    path: paths.Desktop,
    exact: true,
    private: false,
    component: Desktop,
  },
  {
    path: paths.SignUp,
    exact: true,
    private: false,
    component: Registration,
  },
  {
    path: paths.Payment,
    exact: true,
    private: false,
    component: Payment,
  },
  {
    path: paths.Upgrade,
    exact: true,
    private: false,
    component: Upgrade,
  },
  {
    path: paths.Desktop,
    exact: true,
    private: false,
    component: Desktop,
  },
  {
    private: false,
    component: NoMatchPage,
  },
];


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {routes.map((route, index) =>
            <Route key={index} path={route.path} exact={route.exact} component={route.component} />
          )}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
