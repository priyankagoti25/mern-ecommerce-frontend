import React, {useEffect} from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import LoginView from "./pages/LoginView";
import SignupView from "./pages/SignupView";
import Home from "./pages/Home";
import CartView from "./pages/CartView";
import Checkout from "./pages/Checkout";
import ProductDetailView from "./pages/ProductDetailView";
import './App.css';
import Protected from "./features/auth/components/Protected";
import {useDispatch} from "react-redux";
import {fetchCartItemsByUserAsync} from "./features/cart/cartSlice";
// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Protected><Home /></Protected>,
//         // loader: rootLoader,
//         // children: [
//         //     {
//         //         path: "team",
//         //         element: <Team />,
//         //         loader: teamLoader,
//         //     },
//         // ],
//     },
//     {
//         path: "/login",
//         element: <LoginView />,
//     },
//     {
//         path: "/signup",
//         element: <SignupView />,
//     },
//     {
//         path: "/cart",
//         element: <Protected><CartView /></Protected>,
//     },
//     {
//         path: "/checkout",
//         element: <Protected><Checkout /></Protected>,
//     },
//     {
//         path: "/product-detail/:id",
//         element: <Protected><ProductDetailView /></Protected>,
//     },
// ]);
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        // loader: rootLoader,
        // children: [
        //     {
        //         path: "team",
        //         element: <Team />,
        //         loader: teamLoader,
        //     },
        // ],
    },
    {
        path: "/login",
        element: <LoginView />,
    },
    {
        path: "/signup",
        element: <SignupView />,
    },
    {
        path: "/cart",
        element: <CartView />,
    },
    {
        path: "/checkout",
        element: <Checkout />,
    },
    {
        path: "/product-detail/:id",
        element: <ProductDetailView />,
    },
]);
function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
      dispatch(fetchCartItemsByUserAsync('06e8'))
  },[dispatch])
  return (
      <div>
          <RouterProvider router={router} />
    </div>
  );
}

export default App;
