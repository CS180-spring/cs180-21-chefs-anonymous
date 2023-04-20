import React, { useState, useEffect } from "react";

export function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("api/user/GetUsers")
            .then((response) => response.json())
            .then((responseJson) => setUsers(responseJson));
    }, []);

    const refresh = () => {
        fetch("api/user/GetUsers")
            .then((response) => response.json())
            .then((responseJson) => setUsers(responseJson));
    };

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
                                <th>Address</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address}</td>
                                    <td>{item.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <button className="btn btn-primary" onClick={refresh}>
                Refresh
      </button>
        </div>
    );
}