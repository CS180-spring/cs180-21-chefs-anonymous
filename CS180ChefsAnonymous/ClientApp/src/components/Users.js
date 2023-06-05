import React, { useState, useEffect } from "react";

export function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("api/user/GetUsers")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setUsers(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function refresh() {
    fetch("api/user/GetUsers")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setUsers(responseJson);
        console.log(users);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function login() {
    fetch("api/user/Login", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => error(error));
  }

  function add() {
    fetch("api/user/AddUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // pass the new user object as the request body
        userid: 3,
        name: "Sanji Vinsmoke",
        username: "SHChef",
        password: "BigBlue",
        email: "Chef3@gmail.com",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  function update() {
    fetch("api/user/UpdateUser/6", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // pass the new user object as the request body
        userid: 6,
        name: "Megan",
        username: "megan",
        password: "megan",
        email: "megan@example.com",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
  function remove() {
    fetch("api/user/DeleteUser/6", {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  function getUserRecipes() {
    fetch("api/user/GetUserRecipes/3", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
  // Recipe stuff

  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    fetch("api/recipe/GetRecipes")
      .then((response) => response.json())
      //.then((response) => {
      //    //console.log(response.json());
      //    response.json()
      //})
      .then((responseJson) => {
        console.log("Set recipes");
        console.log(responseJson);
        setRecipes(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function refreshRecipe() {
    fetch("api/recipe/GetRecipes")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setRecipes(responseJson);
        console.log(recipes);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getRecipesAscending() {
    fetch("api/recipe/GetRecipesAscending")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setRecipes(responseJson);
        console.log(recipes);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getRecipesDescending() {
    fetch("api/recipe/GetRecipesDescending")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setRecipes(responseJson);
        console.log(recipes);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getSpecificRecipe() {
    fetch("api/recipe/GetRecipe/3")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setRecipes([responseJson]);
        console.log("SPECIFIC RECIPE");
        console.log(recipes);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addRecipe() {
    fetch("api/recipe/AddRecipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipeId: 78,
        recipeTitle: "Mabo Tofu",
        recipeDesc: "Get the sauce from Hmart",
        instructions: "Stir fry with beef and tofu",
        prepTime: 12,
        cookingTime: 34,
        userId: 6,
        categoryId: 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  function updateRecipe() {
    fetch("api/recipe/UpdateRecipe/3", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // pass the new user object as the request body

        recipeId: 3,
        recipeTitle: "Cookie2",
        recipeDesc: "Cookie Description2",
        instructions: "Do stuff2",
        prepTime: 5,
        cookingTime: 5,
        userId: 6,
        categoryId: 1,

        //"Category": null, "ingredients": [], "User": null
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
  function removeRecipe() {
    // Must call removeRecipeIngredients() first to remove FK reference in ingredients table
    removeRecipeIngredients();

    fetch("api/recipe/DeleteRecipe/78", {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  // Item Stuff
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("api/item/GetItems")
      .then((response) => response.json())
      //.then((response) => {
      //    //console.log(response.json());
      //    response.json()
      //})
      .then((responseJson) => {
        console.log(responseJson);
        setItems(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function refreshItems() {
    fetch("api/item/GetItems")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setItems(responseJson);
        console.log(items);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function getSpecificItem() {
    fetch("api/item/GetItem/Apple")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setItems([responseJson]);
        console.log("SPECIFIC ITEM");
        console.log(recipes);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addItem() {
    fetch("api/item/AddItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemName: "Tomato Sauce",
        calPerKg: 70,
        otherInfo: "Organic4",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  function updateItem() {
    fetch("api/item/UpdateItem/Banana", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemName: "Banana",
        calPerKg: 300,
        otherInfo: "Organic3",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  function removeItem() {
    fetch("api/item/DeleteItem/Banana", {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  //};
  // Ingredient Stuff
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    fetch("api/ingredient/GetIngredients")
      .then((response) => response.json())
      //.then((response) => {
      //    //console.log(response.json());
      //    response.json()
      //})
      .then((responseJson) => {
        console.log(responseJson);
        setIngredients(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function refreshIngredients() {
    fetch("api/ingredient/GetIngredients")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setIngredients(responseJson);
        console.log(items);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function getSpecificIngredient() {
    fetch("api/ingredient/GetIngredient/3")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setIngredients([responseJson]);
        console.log("SPECIFIC ITEM");
        console.log(recipes);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addIngredient() {
    fetch("api/ingredient/AddIngredient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredientId: 80,
        recipeId: 78,
        itemName: "Sauce packet",
        qty: 1,
        unit: "tsp",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  function updateIngredient() {
    fetch("api/ingredient/UpdateIngredient/Banana", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredientId: 2,
        recipeId: 3,
        itemName: "Banana",
        qty: 10,
        unit: "bananas",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
  function removeIngredient() {
    fetch("api/ingredient/DeleteIngredient/35", {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
  function removeRecipeIngredients() {
    fetch("api/ingredient/DeleteIngredientsByRecipe/78", {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("oops: ", error));
  }

  function getRecipeIngredients() {
    fetch("api/recipe/GetRecipeIngredients/1", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => error(error));
  }

  //};
  // Inventory Stuff
  const [inventory, setInventory] = useState([]);

  //finished useEffect
  useEffect(() => {
    fetch("api/inventory/GetInventory")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("Set Ingredient");
        console.log(responseJson);
        setInventory(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function refreshInventory() {
    fetch("api/inventory/GetInventory")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setInventory(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getSpecificInventoryItem() {
    fetch("api/inventory/GetInventory/3")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setInventory([responseJson]);
        console.log("SPECIFIC ITEM");
        console.log(inventory);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //finished adding inventory item
  function addInventoryItem() {
    fetch("api/inventory/AddInventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inventoryId: 12,
        userId: 6,
        itemName: "tes5",
        qty: 2,
        unit: "cc",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  function updateInventoryItem() {
    fetch("api/inventory/UpdateInventory/4", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inventoryId: 4,
        userId: 6,
        itemName: "Pepperoni",
        qty: 100,
        unit: 3,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  //finished with remove inventory item
  function removeInventoryItem() {
    fetch("api/inventory/DeleteInventory/4", {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  // MealPlan Stuff
  const [mealplan, setMeal] = useState([]);

  useEffect(() => {
    fetch("api/mealplan/GetMealPlans")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setMeal(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function refreshMeal() {
    fetch("api/mealplan/GetMealPlans")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setMeal(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getSpecificMeal() {
    fetch("api/mealplan/GetMealPlan/3")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setMeal([responseJson]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addMeal() {
    fetch("api/mealplan/AddMealPlan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mealPlanId: 2,
        userId: 6,
        mealTime: 2,
        dayOfWeek: 6,
        recipeId: 3,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  function updateMeal() {
    fetch("api/mealplan/UpdateMealPlan/2", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mealPlanId: 2,
        userId: 6,
        mealTime: 2,
        dayOfWeek: 1,
        recipeId: 3,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  function removeMeal() {
    fetch("api/mealplan/DeleteMealPlan/68", {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  function removeMealByRecipe() {
    fetch(
      "api/mealplan/DeleteMealPlanByRecipe/3abe2163-81db-464a-b28f-32a67a33e97c",
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  // Category Stuff
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch("api/category/GetCategory")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("category data: ", responseJson);
        setCategory(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function refreshCategory() {
    fetch("api/category/GetCategory")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setCategory(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addCategory() {
    fetch("api/category/AddCategory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryId: 21,
        cuisine: "Armenian",
        categoryType: "Appetizer",
        mealtime: "breakfast",
        difficulty: 3,
        favorite: "Yes",
        amntOfServings: 1.0,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  function updateCategory() {
    fetch("api/category/UpdateCategory/10", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryId: 10,
        cuisine: "Not Indian",
        categoryType: "Side Dish",
        mealtime: "2023-04-21T19:30:00",
        difficulty: 3,
        favorite: "Yes",
        amntOfServings: 1.0,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  function removeCategory() {
    fetch("api/category/DeleteCategory/21", {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
  const [grocery, setGrocery] = useState([]);

  function getGroceryList() {
    fetch("api/ingredient/GetGrocery/6")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setGrocery([responseJson]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <h1>Users</h1>
      <div className="row">
        <div className="col-sm-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>UserID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Username</th>
                <th>Recipes</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => (
                <tr key={item.name}>
                  <td>{item.userId}</td>

                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>

                  <td>{item.username}</td>
                  <td>{item.recipes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button className="btn btn-primary" onClick={refresh}>
        Refresh
      </button>
      <button className="btn btn-primary" onClick={add}>
        Add
      </button>
      <button className="btn btn-primary" onClick={update}>
        Update
      </button>
      <button className="btn btn-primary" onClick={remove}>
        Delete
      </button>
      <button className="btn btn-primary" onClick={getUserRecipes}>
        Recipes
      </button>
      <h1>Recipes</h1>
      <div className="row">
        <div className="col-sm-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>RecipeID</th>
                <th>RecipeTitle</th>
                <th>RecipeDescription</th>
                <th>Instructions</th>
                <th>Preptime</th>
                <th>CookingTime</th>
                <th>UserID</th>
                <th>CategoryID</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((recipe) => (
                <tr key={recipe.recipeId}>
                  <td>{recipe.recipeId}</td>
                  <td>{recipe.recipeTitle}</td>
                  <td>{recipe.recipeDesc}</td>
                  <td>{recipe.instructions}</td>
                  <td>{recipe.prepTime}</td>
                  <td>{recipe.cookingTime}</td>
                  <td>{recipe.userId}</td>
                  <td>{recipe.categoryId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button className="btn btn-primary" onClick={refreshRecipe}>
        Refresh
      </button>
      <button className="btn btn-primary" onClick={getRecipesAscending}>
        Ascending
      </button>
      <button className="btn btn-primary" onClick={getRecipesDescending}>
        Descending
      </button>
      <button className="btn btn-primary" onClick={addRecipe}>
        Add
      </button>
      <button className="btn btn-primary" onClick={updateRecipe}>
        Update
      </button>
      <button className="btn btn-primary" onClick={removeRecipe}>
        Delete
      </button>
      <button className="btn btn-primary" onClick={getSpecificRecipe}>
        Get1
      </button>
      <button className="btn btn-primary" onClick={getRecipeIngredients}>
        Ingredients
      </button>

      <h1>Items</h1>
      <div className="row">
        <div className="col-sm-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>IngredientName</th>
                <th>calories</th>
                <th>info</th>
              </tr>
            </thead>
            <tbody>
              {items.map((items) => (
                <tr key={items.itemName}>
                  <td>{items.itemName}</td>
                  <td>{items.calPerKg}</td>
                  <td>{items.otherInfo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button className="btn btn-primary" onClick={refreshItems}>
        Refresh
      </button>
      <button className="btn btn-primary" onClick={addItem}>
        Add
      </button>
      <button className="btn btn-primary" onClick={updateItem}>
        Update
      </button>
      <button className="btn btn-primary" onClick={removeItem}>
        Delete
      </button>
      <button className="btn btn-primary" onClick={getSpecificItem}>
        Get1
      </button>

      <h1>Ingredients</h1>
      <div className="row">
        <div className="col-sm-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>IngredientID</th>
                <th>RecipeID</th>
                <th>ItemName</th>
                <th>QTY</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredients) => (
                <tr key={ingredients.ingredientId}>
                  <td>{ingredients.ingredientId}</td>
                  <td>{ingredients.recipeId}</td>
                  <td>{ingredients.itemName}</td>
                  <td>{ingredients.qty}</td>
                  <td>{ingredients.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button className="btn btn-primary" onClick={refreshIngredients}>
        Refresh
      </button>
      <button className="btn btn-primary" onClick={addIngredient}>
        Add
      </button>
      <button className="btn btn-primary" onClick={updateIngredient}>
        Update
      </button>
      <button className="btn btn-primary" onClick={removeIngredient}>
        Delete
      </button>
      <button className="btn btn-primary" onClick={removeRecipeIngredients}>
        Delete all from specific Recipe
      </button>
      <button className="btn btn-primary" onClick={getSpecificIngredient}>
        Get1
      </button>

      <h1>Inventory</h1>
      <div className="row">
        <div className="col-sm-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>InventoryID</th>
                <th>UserID</th>
                <th>ItemName</th>
                <th>Qty</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.inventoryId}>
                  <td>{item.inventoryId}</td>
                  <td>{item.userId}</td>
                  <td>{item.itemName}</td>
                  <td>{item.qty}</td>
                  <td>{item.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button className="btn btn-primary" onClick={refreshInventory}>
        Refresh
      </button>
      <button className="btn btn-primary" onClick={addInventoryItem}>
        Add
      </button>
      <button className="btn btn-primary" onClick={updateInventoryItem}>
        Update
      </button>
      <button className="btn btn-primary" onClick={removeInventoryItem}>
        Delete
      </button>
      <button className="btn btn-primary" onClick={getSpecificInventoryItem}>
        Get1
      </button>

      <h1>Meal Plan</h1>
      <div className="row">
        <div className="col-sm-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>MealID</th>
                <th>UserID</th>
                <th>MealTime</th>
                <th>dayofweek</th>
                <th>recipeid</th>
              </tr>
            </thead>
            <tbody>
              {mealplan.map((item) => (
                <tr key={item.mealPlanId}>
                  <td>{item.mealPlanId}</td>
                  <td>{item.userId}</td>
                  <td>{item.mealTime}</td>
                  <td>{item.dayOfWeek}</td>
                  <td>{item.recipeId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button className="btn btn-primary" onClick={refreshMeal}>
        Refresh
      </button>
      <button className="btn btn-primary" onClick={addMeal}>
        Add
      </button>
      <button className="btn btn-primary" onClick={updateMeal}>
        Update
      </button>
      <button className="btn btn-primary" onClick={removeMeal}>
        Delete
      </button>
      <button className="btn btn-primary" onClick={removeMealByRecipe}>
        DeleteByRecipe
      </button>
      <button className="btn btn-primary" onClick={getSpecificMeal}>
        Get1
      </button>

      <h1>Category</h1>
      <div className="row">
        <div className="col-sm-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>CategoryID</th>
                <th>Cuisine</th>
                <th>Category</th>
                <th>MealTime</th>
                <th>difficulty</th>
                <th>favorite</th>
                <th>amntOfServings</th>
              </tr>
            </thead>
            <tbody>
              {category.map((item) => (
                <tr key={item.categoryId}>
                  <td>{item.categoryId}</td>
                  <td>{item.cuisine}</td>
                  <td>{item.categoryType}</td>
                  <td>{item.mealtime}</td>
                  <td>{item.difficulty}</td>
                  <td>{item.favorite}</td>
                  <td>{item.amntOfServings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button className="btn btn-primary" onClick={refreshCategory}>
        Refresh
      </button>
      <button className="btn btn-primary" onClick={addCategory}>
        Add
      </button>
      <button className="btn btn-primary" onClick={updateCategory}>
        Update
      </button>
      <button className="btn btn-primary" onClick={removeCategory}>
        Delete
      </button>
      <button className="btn btn-primary" onClick={getGroceryList}>
        GroceryList
      </button>
    </div>
  );
}

/*
User: {
                        userid: 6,
                        name: 'David Doe',
                        username: 'david',
                        password: 'david',
                        email: 'daviddoe@example.com'
                    },
                    Category: {
                        recipe_id: 1,
                        category_id: 1,
                        amnt_of_servings: 1,
                        cuisine: "Food",
                        difficulty: 1,
                        datetime: new Date(),
                        mealtime: new Date(),
                        "category": null, "ingredients": [], "user": null

                    }
                    */
