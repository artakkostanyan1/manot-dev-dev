import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
// import Loader from './components/Loader/Loader'
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

// const publicRoutes = [
//   {
//     path: paths.ResetPassword,
//     exact: true,
//     private: false,
//     component: ResetPassword,
//   },
//   {
//     path: paths.OldVerification,
//     exact: true,
//     private: false,
//     component: Verification,
//   },
//   {
//     path: paths.Login,
//     exact: true,
//     private: false,
//     component: LogIn,
//   },
//   {
//     path: paths.Verify,
//     exact: true,
//     private: false,
//     component: VerifyEmail,
//   },
//   {
//     path: paths.Email,
//     exact: true,
//     private: false,
//     component: Email,
//   },
//   {
//     path: paths.SignUp,
//     exact: true,
//     private: false,
//     component: Registration,
//   },
//   {
//     path: '/terms',
//     exact: true,
//     private: false,
//     component: Terms,
//   },
//   {
//     path: '/policy',
//     exact: true,
//     private: false,
//     component: Policy,
//   },
//   {
//     path: '/contact-us',
//     exact: true,
//     private: false,
//     component: ContactUs,
//   },
//   {
//     path: paths.NewRegistration,
//     exact: true,
//     private: false,
//     component: NewRegistration,
//   },
//   {
//     path: paths.NewLogin,
//     exact: true,
//     private: false,
//     component: NewLogin,
//   },
//   {
//     path: paths.NewEmail,
//     exact: true,
//     private: false,
//     component: NewEmail
//   },
//   {
//     path: paths.Main,
//     exact: true,
//     private: false,
//     component: Main,
//   },
// ]

// const routes = [
//   {
//     path: paths.Importdata,
//     exact: true,
//     private: false,
//     component: ImportData,
//   },
//   {
//     path: paths.Profile,
//     exact: true,
//     private: false,
//     component: Profile,
//   },
//   {
//     path: paths.Payment,
//     exact: true,
//     private: false,
//     component: Payment,
//   },
//   {
//     path: paths.Upgrade,
//     exact: true,
//     private: false,
//     component: Upgrade,
//   },
//   {
//     path: paths.Desktop,
//     exact: true,
//     private: false,
//     component: Desktop,
//   },
//   {
//     path: paths.NewProfile,
//     exact: true,
//     private: false,
//     component: NewProfile,
//   },
//   {
//     path: paths.NewImportData,
//     exact: true,
//     private: false,
//     component: NewImportData
//   },
//   {
//     path: paths.DashBoard,
//     exact: true,
//     private: false,
//     component: DashBoard
//   },
//   {
//     private: false,
//     component: NoMatchPage,
//   },
// ];


function PublicRoute({ children, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={
        ({ location }) => (
          !isAuthenticated ? (
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

function PrivateRoute({ children, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={
        ({ location }) => (
          isAuthenticated
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
  const isAuthenticated = localStorage.getItem("token");
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>

          <PublicRoute
            path="/main"
            isAuthenticated={isAuthenticated}
          >
            <Main />
          </PublicRoute>
          <PublicRoute
            path={paths.Login}
            isAuthenticated={isAuthenticated}
          >
            <LogIn />
          </PublicRoute>
          <PublicRoute
            path={paths.SignUp}
            isAuthenticated={isAuthenticated}
          >
            <Registration />
          </PublicRoute>
          <PublicRoute
            path={paths.Verify}
            isAuthenticated={isAuthenticated}
          >
            <VerifyEmail />
          </PublicRoute>
          <PublicRoute
            path={paths.OldVerification}
            isAuthenticated={isAuthenticated}
          >
            <Verification />
          </PublicRoute>
          <PublicRoute
            path={paths.Email}
            isAuthenticated={isAuthenticated}
          >
            <Email />
          </PublicRoute>
          <PublicRoute
            path={paths.ResetPassword}
            isAuthenticated={isAuthenticated}
          >
            <ResetPassword />
          </PublicRoute>
          <PublicRoute
            path={paths.ContactUs}
            isAuthenticated={isAuthenticated}
          >
            <ContactUs />
          </PublicRoute>
          <PublicRoute
            path={paths.Policy}
            isAuthenticated={isAuthenticated}
          >
            <Policy />
          </PublicRoute>
          <PublicRoute
            path={paths.Terms}
            isAuthenticated={isAuthenticated}
          >
            <Terms />
          </PublicRoute>
          {/*------------------------------------------------- new public pages---------------------------------------------------------------- */}
          <PublicRoute
            path={paths.NewRegistration}
            isAuthenticated={isAuthenticated}
          >
            <NewRegistration />
          </PublicRoute>
          <PublicRoute
            path={paths.NewLogin}
            isAuthenticated={isAuthenticated}
          >
            <NewLogin />
          </PublicRoute>
          <PublicRoute
            path={paths.NewEmail}
            isAuthenticated={isAuthenticated}
          >
            <NewEmail />
          </PublicRoute>
          {/* ---------------------------------------------------privates------------------------------------------------------------------------- */}
          <PrivateRoute
            path={paths.Importdata}
            isAuthenticated={isAuthenticated}
          >
            <ImportData />
          </PrivateRoute>
          <PrivateRoute
            path={paths.Profile}
            isAuthenticated={isAuthenticated}
          >
            <Profile />
          </PrivateRoute>
          <PrivateRoute
            path={paths.Upgrade}
            isAuthenticated={isAuthenticated}
          >
            <Upgrade />
          </PrivateRoute>
          <PrivateRoute
            path={paths.Desktop}
            isAuthenticated={isAuthenticated}
          >
            <Desktop />
          </PrivateRoute>
          {/* --------------------------new private routes-------------------------------------------------------------------------------- */}
          <PrivateRoute
            path={paths.NewProfile}
            isAuthenticated={isAuthenticated}
          >
            <NewProfile />
          </PrivateRoute>
          <PrivateRoute
            path={paths.NewImportData}
            isAuthenticated={isAuthenticated}
          >
            <NewImportData />
          </PrivateRoute>
          <PrivateRoute
            path={paths.DashBoard}
            isAuthenticated={isAuthenticated}
          >
            <DashBoard />
          </PrivateRoute>
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
