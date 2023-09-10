import './App.css';
import {  RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/pages/Root';
import ErrorPage from './components/ErrorPage';
import AuthPage, {action as authAction} from './components/pages/login/AuthPage';
import LogoutAction from './components/pages/LogoutAction';
import { tokenLoader } from './util/auth';
import HomePage from './components/pages/login/HomePage';
import Dashboard, {loader  as dashboardLoader} from './components/pages/home/Dashboard';
import MasterData, { loader as masterLoader } from './components/pages/masterData/MasterDataTest';
import RuasDetail, {loader as loaderDetail, action as actionDetail} from './components/pages/masterData/RuasDetail';
import TambahRuas, {loader as loadUnit, action as ruasAction} from './components/pages/masterData/TambahRuas';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      id: 'root',
      loader: tokenLoader,
      children: [
        {
          index: true,
          element: <HomePage />
        },
        {
          path: 'dashboard',
          element: <Dashboard />,
          loader: dashboardLoader
        },
        {
          path: 'master-data',
          element: <MasterData />,
          loader: masterLoader,
        },
        {
          path: 'master-data/detail/:ruasId',
          element: <RuasDetail />,
          loader: loaderDetail,
          action: actionDetail
        },
        {
          path: 'master-data/new',
          element: <TambahRuas />,
          loader: loadUnit,
          action: ruasAction
        },
        {
          path: 'login',
          element: <AuthPage />,
          action: authAction
        }, 
        {
          path: 'logout',
          action: LogoutAction
        }
      ]
    }
  ]
)

function App() {
  return <RouterProvider router={router}/>
}

export default App;
