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

    //};

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


        </div>
    );
}

