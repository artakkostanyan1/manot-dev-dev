import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ImportData from './pages/ImportData/ImportData';
import Main from './pages/Main/Main';
import Registration from './pages/Registration/Registration';
import Verification from './pages/Verification/Verification';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import LogIn from './pages/LogIn/LogIn';
// import Payment from './pages/Payment/Payment';
import Stripe from './pages/Stripe/Stripe';
import Profile from './pages/Profile/Profile';
import Upgrade from './pages/Upgrade/Upgrade';
import Desktop from './pages/Desktop/Desktop';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail';
import Email from './pages/Email/Email';
import NewRegistration from './pages/NewRegistration/NewRegistraion';
import NewLogin from './pages/NewLogin/NewLogin';
import NewProfile from './pages/NewProfile/NewProfile';
import NewEmail from './pages/NewEmail/NewEmail';
import NewImportData from './pages/NewImportData/NewImportData';
import DashBoard from './pages/DashBoard/DashBoard';

import Terms from './pages/Terms/Terms';
import Policy from './pages/Policy/Policy';
import ContactUs from './pages/ContactUs/ContactUs';

import paths from './utils/routing';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const NoMatchPage = () => {
  return <h3>404 - Not found</h3>;
};

function PublicRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={
        ({ location }) => (
          !localStorage.getItem("token")
            ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: paths.Importdata,
                  state: { from: location }
                }}
              />
            ))
      }
    />
  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={
        ({ location }) => (
          localStorage.getItem("token")
            ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: paths.Main,
                  state: { from: location }
                }}
              />
            ))
      }
    />
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PublicRoute
            path={paths.Login}
          >
            <LogIn />
          </PublicRoute>
          <PublicRoute
            path={paths.SignUp}
          >
            <Registration />
          </PublicRoute>
          <PublicRoute
            path={paths.Verify}
          >
            <VerifyEmail />
          </PublicRoute>
          <PublicRoute
            path={paths.OldVerification}
          >
            <Verification />
          </PublicRoute>
          <PublicRoute
            path={paths.Email}
          >
            <Email />
          </PublicRoute>
          <PublicRoute
            path={paths.ResetPassword}
          >
            <ResetPassword />
          </PublicRoute>
          <PublicRoute
            path={paths.ContactUs}
          >
            <ContactUs />
          </PublicRoute>
          <PublicRoute
            path={paths.Policy}
          >
            <Policy />
          </PublicRoute>
          <PublicRoute
            path={paths.Terms}
          >
            <Terms />
          </PublicRoute>
          {/*------------------------------------------------- new public pages---------------------------------------------------------------- */}
          <PublicRoute
            path={paths.NewRegistration}
          >
            <NewRegistration />
          </PublicRoute>
          <PublicRoute
            path={paths.NewLogin}
          >
            <NewLogin />
          </PublicRoute>
          <PublicRoute
            path={paths.NewEmail}
          >
            <NewEmail />
          </PublicRoute>
          {/* ---------------------------------------------------privates------------------------------------------------------------------------- */}
          <PrivateRoute
            path={paths.Profile}
          >
            <Profile />
          </PrivateRoute>
          <PrivateRoute
            path={paths.Upgrade}
          >
            <Upgrade />
          </PrivateRoute>
          <PrivateRoute
            path={paths.Desktop}
          >
            <Desktop />
          </PrivateRoute>
          <PrivateRoute
            path={paths.Payment}
          >
            <Stripe />
          </PrivateRoute>
          <PrivateRoute
            path={paths.Importdata}
            exact={true}
          >
            <ImportData />
          </PrivateRoute>
          {/* --------------------------new private routes-------------------------------------------------------------------------------- */}
          <PrivateRoute
            path={paths.NewProfile}
          >
            <NewProfile />
          </PrivateRoute>
          <PrivateRoute
            path={paths.NewImportData}
          >
            <NewImportData />
          </PrivateRoute>
          <PrivateRoute
            path={paths.DashBoard}
          >
            <DashBoard />
          </PrivateRoute>
          <PublicRoute
            path={paths.Main}
          >
            <Main />
          </PublicRoute>
          <Route>
            <NoMatchPage />
          </Route>
        </Switch>
      </BrowserRouter>
      <ToastContainer theme='colored' />
    </div>
  );
}

export default App;
