import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ImportData from './pages/ImportData/ImportData';
import Main from './pages/Main/Main';
import Registration from './pages/Registration/Registration';
import Verification from './pages/Verification/Verification';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import LogIn from './pages/LogIn/LogIn';
import Payment from './pages/Payment/Payment';
import  Profile  from './pages/Profile/Profile';
import Upgrade from './pages/Upgrade/Upgrade';
import LeftBar from './components/LeftBar/LeftBar';
import RightBar from './components/RightBar/RightBar';
import Desktop from './pages/Desktop/Desktop';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail';
import './App.css';


const NoMatchPage = () => {
  return <h3>404 - Not found</h3>;
};

const routes = [
  {
    path: '/',
    exact: true,
    private: false,
    component: Main,
  },
  {
    path: '/importdata',
    exact: true,
    private: false,
    component: ImportData,
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
    path: '/upgrade',
    exact: true,
    private: false,
    component: Upgrade,
  },
  {
    path: '/leftbar',
    exact: true,
    private: false,
    component: LeftBar,
  },
  {
    path: '/rightbar',
    exact: true,
    private: false,
    component: RightBar,
  },
  {
    path: '/desktop',
    exact: true,
    private: false,
    component: Desktop,
  },
  {
    path: '/verify',
    exact: true,
    private: false,
    component: VerifyEmail,
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
