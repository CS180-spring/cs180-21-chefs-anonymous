import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import Recipes from "./components/Recipes/Recipes";
import MealPlan from "./components/MealPlan/MealPlan";
import { Inventory } from "./components/Inventory";
import { GroceryList } from "./components/GroceryList";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

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
    path: "/register",
    element: <Register />,
  },
];

export default AppRoutes;
