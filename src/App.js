import ImportData from './pages/ImportData/ImportData';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProfileAndPassword from './ProfileAndPassword';
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
    path: '/registration',
    exact: true,
    private: false,
    component: ProfileAndPassword,
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
