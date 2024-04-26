import React from 'react';
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
        path: "/product-detail",
        element: <ProductDetailView />,
    },
]);
function App() {
  return (
      <div>
          <RouterProvider router={router} />
    </div>
  );
}

export default App;
