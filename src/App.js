import ImportData from './pages/ImportData/ImportData';
import Main from './pages/Main/Main';
import Registration from './pages/Registration/Registration';
import Verififcation from './pages/Verification/Verififcation';
import LogIn from './pages/LogIn/LogIn';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

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
    path: '/verification',
    exact: true,
    private: false,
    component: Verififcation,
  },
  {
    path: '/login',
    exact: true,
    private: false,
    component: LogIn,
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
