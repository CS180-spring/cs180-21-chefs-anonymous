import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import Recipes from "./components/Recipes/Recipes";
import  Inventory  from "./components/Inventory/Inventory";
import MealPlan from "./components/MealPlan/MealPlan";
import { GroceryList } from "./components/GroceryList/GroceryList";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register";
import { Users } from "./components/Users";
import { Signup } from "./components/Signup/Signup";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/counter",
    element: <Counter />,
  },
  {
    path: "/fetch-data",
    element: <FetchData />,
  },
  {
    path: "/recipes",
    element: <Recipes />,
  },
  {
    path: "/meal-plan",
    element: <MealPlan />,
  },
  {
    path: "/inventory",
    element: <Inventory />,
  },
  {
    path: "/grocery-list",
    element: <GroceryList />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/users",
    element: <Users />,
  },
];

export default AppRoutes;
