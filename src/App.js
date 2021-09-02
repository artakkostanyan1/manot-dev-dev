import ImportData from './pages/ImportData/ImportData';
import Main from './pages/Main/Main';
import Registration from './pages/Registration/Registration';
import Verification from './pages/Verification/Verification';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import LogIn from './pages/LogIn/LogIn';
import Payment from './pages/Payment/Payment';
import  Profile  from './pages/Profile/Profile';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import { Profiler } from 'react';

const NoMatchPage = () => {
  return <h3>404 - Not found</h3>;
};

const routes = [
  {
    path: '/',
    exact: true,
    private: false,
    component: ImportData,
  },
  {
    path: '/main',
    exact: true,
    private: false,
    component: Main,
  },
  {
    path: '/registration',
    exact: true,
    private: false,
    component: Registration,
  },
  {
    path: '/resetpassword',
    exact: true,
    private: false,
    component: ResetPassword,
  },
  {
    path: '/verification',
    exact: true,
    private: false,
    component: Verification,
  },
  {
    path: '/login',
    exact: true,
    private: false,
    component: LogIn,
  },
  {
    path: '/profile',
    exact: true,
    private: false,
    component: Profile,
  },
  {
    path: '/pay',
    exact: true,
    private: false,
    component: Payment,
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
