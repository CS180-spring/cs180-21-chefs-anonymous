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
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function add() {
        fetch("api/user/AddUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // pass the new user object as the request body
                userid: 6,
                name: 'David Doe',
                username: 'david',
                password: 'david',
                email: 'daviddoe@example.com'
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }

    function update() {
        fetch("api/user/UpdateUser/6", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // pass the new user object as the request body
                userid: 6,
                name: 'Megan',
                username: 'megan',
                password: 'megan',
                email: 'megan@example.com'
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }
    function remove () {
        fetch("api/user/DeleteUser/6", {
            method: 'DELETE',

        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
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
                console.log(recipes)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function addRecipe() {
        fetch("api/recipe/AddRecipe", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "recipeId": 3,
                    "recipeTitle": "Spaghetti Carbonara",
                    "recipeDesc": "Classic Italian pasta dish with creamy sauce",
                    "instructions": "Cook pasta according to package directions...",
                    "prepTime": 15,
                    "cookingTime": 15,
                    "userId": 1,
                    "categoryId": 1,
                    
                }

            )
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }

    function updateRecipe() {
        fetch("api/recipe/UpdateRecipe/6", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // pass the new user object as the request body

                recipeId: 6,
                recipeTitle: 'Cookie2',
                recipeDesc: 'Cookie Description2',
                instructions: 'Do stuff2',
                prepTime: 5,
                cookingTime: 5,
                userId: 6,
                categoryId: 1,

                //"Category": null, "ingredients": [], "User": null

            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }
    function removeRecipe() {
        fetch("api/recipe/DeleteRecipe/3", {
            method: 'DELETE',

        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }


    //};

    return (
        <div className="container">
            <h1>Items</h1>
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
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((item) => (
                                    <tr key={item.name}>
                                        <td>{item.userid}</td>

                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.password}</td>

                                        <td>{item.username}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <button className="btn btn-primary" onClick={refresh}>
                Refresh
            </button >
            <button className="btn btn-primary" onClick={add}>
                Add
            </button >
            <button className="btn btn-primary" onClick={update}>
                Update
            </button >
            <button className="btn btn-primary" onClick={remove}>
                Delete
            </button >

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
                            {
                                
                                recipes.map((recipe) => (
                                    <tr key={recipe.recipeTitle}>
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
            </button >
            <button className="btn btn-primary" onClick={addRecipe}>
                Add
            </button >
            <button className="btn btn-primary" onClick={updateRecipe}>
                Update
            </button >
            <button className="btn btn-primary" onClick={removeRecipe}>
                Delete
            </button >
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