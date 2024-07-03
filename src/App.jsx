
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import SignUpInRoot from './components/signUpInRoot/SignUpInRoot';
import Home from './components/dashboard/home/Home';
import { useEffect, useState } from 'react';
import Loading from './components/loading/Loading';
import DashboardHome from './components/dashboard/dashboard_home/DashboardHome';
import SalesModule from './components/dashboard/salesModule/SalesModule';
import Administration from './components/dashboard/administration_module/Administration';
import administrationRoute from './sub-routes/administration.route';
import salesRoute from './sub-routes/sales.route';



function App() {

  const token = localStorage.getItem('user');
  const email = localStorage.getItem('userEmail')
  const [wait, setWait] = useState(email && true);
  useEffect(() => {
    if(token || email){
      setTimeout(() => {
        setWait(false)
      },2000)
    }else{
      setWait(false)
    }
  },[token,email])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <SignUpInRoot/>,
      children: [
        {
          path: '',
          element: wait ? <Loading /> : <Registration/>
        },
        {
          path: '/login',
          element: <Login/>
        },
      ]
    },
    {
      path: '/dashboard',
      element: <Home/>,
      children: [
        {index: true, element:<DashboardHome/> },
        {
          path: 'sales_module',
          element: <SalesModule/>,
          children: salesRoute
        },
        {
          path: 'administration_module',
          element: <Administration/>,
          children: administrationRoute
        },
      ]
    }
  ])
  
  
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
