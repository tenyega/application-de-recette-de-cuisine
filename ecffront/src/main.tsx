import React from 'react'
import ReactDOM from 'react-dom/client'
import  './style.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import FavoriteRecipe from './components/FavoriteRecipe';
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
    path: "/recipelist",
    element: <RecipeList />
  },
  {
    path: "/recipedetail",
    element: <RecipeDetail />
  },
  {
    path: "/favorite",
    element: <FavoriteRecipe/>
  }

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* stricMode is the one which gives us all the errors in the navigator .  */}
     
    <RouterProvider router={router} />
   
  </React.StrictMode>,
)
