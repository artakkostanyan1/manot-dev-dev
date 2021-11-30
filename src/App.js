import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
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
import NewRegistration from './pages/NewRegistration/NewRegistraion';
import NewLogin from './pages/NewLogin/NewLogin';
import NewProfile from './NewProfile/NewProfile';
import NewEmail from './pages/NewEmail/NewEmail';
import NewImportData from './pages/NewImportData/NewImportData';
import DashBoard  from './pages/DashBoard/DashBoard';

import Terms from './pages/Terms/Terms';
import Policy from './pages/Policy/Policy';
import ContactUs from './pages/ContactUs/ContactUs';

import paths from './utils/routing';
import 'react-toastify/dist/ReactToastify.css';
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
    path: '/terms',
    exact: true,
    private: false,
    component: Terms,
  },
  {
    path: '/policy',
    exact: true,
    private: false,
    component: Policy,
  },
  {
    path: '/contact-us',
    exact: true,
    private: false,
    component: ContactUs,
  },
  {
    path: '/new-registration',
    exact: true,
    private: false,
    component: NewRegistration,
  },
  {
    path: '/new-login/:id',
    exact: true,
    private: false,
    component: NewLogin,
  },
  {
    path: '/new-profile',
    exact: true,
    private: false,
    component: NewProfile,
  },
{
    path: '/new-email',
    exact: true,
    private: false,
    component: NewEmail
  },
  {
    path: '/new-importdata',
    exact: true,
    private: false,
    component: NewImportData
  },
  {
    path: paths.DashBoard,
    exact: true,
    private: false,
    component: DashBoard
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
      <ToastContainer theme='colored' />
    </div>
  );
}

export default App;
