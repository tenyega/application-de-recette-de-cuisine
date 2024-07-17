import React from 'react'
import ReactDOM from 'react-dom/client'
import  './style.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import RecipeForm from './components/RecipeForm';
import RecipeDetail from './components/RecipeDetail';
import FavoriteRecipe from './components/FavoriteRecipe';
import TodaysSpecial from './components/TodaysSpecial';
//Creation of router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  }, {
    path: "/add",
    element: <RecipeForm/>
  },
  {
    path: "/recipedetail/:id",
    element: <RecipeDetail />
  },
  {
    path: "/favorite",
    element: <FavoriteRecipe/>
  },
  {
    path: "/special",
    element: <TodaysSpecial/>
  }

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* stricMode is the one which gives us all the errors in the navigator .  */}
     
    <RouterProvider router={router} />
   
  </React.StrictMode>,
)
