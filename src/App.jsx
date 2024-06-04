
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
import ProductEntry from './components/dashboard/administration_module/product_entry/ProductEntry';
import ProductList from './components/dashboard/administration_module/product_list/ProductList';


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
          element: <SalesModule/>
        },
        {
          path: 'administration_module',
          element: <Administration/>,
          children: [
            {
              path:'product_entry',
              element: <ProductEntry/>
            },
            {
              path:'product_list',
              element: <ProductList/>
            },
          ]
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
