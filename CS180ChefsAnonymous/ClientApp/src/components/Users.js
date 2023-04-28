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
            body: JSON.stringify({
                // pass the new user object as the request body
                recipe_id: 6,
                reciple_title: 'Cookie',
                recipe_desc: 'Cookie Description',
                instructions: 'Do stuff',
                prep_time: 5,
                cooking_time: 5,
                user_id: 6,
                category_id: 1

            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }

    function updateRecipe() {
        fetch("api/recipe/UpdateRecipe/1", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // pass the new user object as the request body
                recipe_id: 6,
                reciple_title: 'Cookie2',
                recipe_desc: 'Cookie2 Description',
                instructions: 'Do stuff2',
                prep_time: 5,
                cooking_time: 5,
                user_id: 6,
                category_id: 1

            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }
    function removeRecipe() {
        fetch("api/recipe/DeleteRecipe/6", {
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
                                <th>RecipeDescription</th>
                                <th>UserID</th>
                                <th>CategoryID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((recipe) => (
                                    <tr key={recipe.recipe_title}>
                                        <td>{recipe.recipe_id}</td>
                                        <td>{recipe.recipe_title}</td>
                                        <td>{recipe.recipe_desc}</td>
                                        <td>{recipe.instructions}</td>
                                        <td>{recipe.prep_time}</td>
                                        <td>{recipe.cooking_time}</td>
                                        <td>{recipe.user_id}</td>
                                        <td>{recipe.category_id}</td>
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

