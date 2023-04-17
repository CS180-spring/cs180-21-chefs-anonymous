import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Recipe } from "./components/Recipe"
import { MealPlan } from "./components/MealPlan"
import { Inventory } from "./components/Inventory"
import { GroceryList } from "./components/GroceryList"

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/recipe',
    element: <Recipe />
  },
  {
    path: '/meal-plan',
    element: <MealPlan />
  },
  {
    path: '/inventory',
    element: <Inventory />
  },
  {
    path: '/grocery-list',
    element: <GroceryList />
  }
];

export default AppRoutes;
