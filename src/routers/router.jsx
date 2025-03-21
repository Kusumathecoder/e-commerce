import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import CategoriesPage from "../pages/category/CategoriesPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import SingleProduct from "../pages/shop/ProductDetails/SingleProduct";
import Login from "../components/Login";
import Register from "../components/Register";
import pages from "../pages/category/CategoriesPage.jsx"
import Footer from "../components/Footer.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/categories/:categoryName", element: <CategoriesPage /> },
      { path: "/search", element: <Search /> },
      { path: "/Shop", element: <ShopPage /> },
      {path :"/Contact",element:<Footer/>},
      {path:"/Pages",
        element:<CategoriesPage/>
      },
      { path: "/shop/:id", element: <SingleProduct /> },
  
    ],
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>

  }
]);

export default router;
