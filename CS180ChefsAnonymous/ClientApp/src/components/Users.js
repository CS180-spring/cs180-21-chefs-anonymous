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

    //useEffect(() => {
    //    fetch("api/user/GetUsers")
    //        .then((response) => {console.log(response.json()) })
    //        .then((responseJson) => { console.log(responseJson);console.log("bubbles"); console.log(responseJson); });//setUsers(responseJson)
    //}, []);

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
                            {   
                                users.map((item) => (
                                <tr key={item.name}>
                                    <td>item.email</td>
                                    <td>{item.name}</td>
                                    <td>{item.password}</td>
                                    <td>{item.userid}</td>
                                    <td>{item.username}</td>
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

//email
//:
//"john.smith@example.com"
//name
//:
//"John Smith"
//password
//:
//"pass"
//userid
//:
//1
//username
//:
//"john"