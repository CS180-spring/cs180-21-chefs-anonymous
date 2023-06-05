import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';

import './Login.css';

export class Login extends Component {
  static displayName = Login.name;

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirectToRecipes: false,

        };
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleLogin = (event) => {
        event.preventDefault();

        const { username, password } = this.state;

        fetch('api/user/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the API
                console.log(data);
                // Save the user object to local storage
                localStorage.setItem('user', JSON.stringify(data));


                // Redirect to the recipe page
                this.setState({ redirectToRecipes: true });
            })
            .catch(error => {
                // Handle any error that occurs during the request
                console.error(error);
            });
    }

    render() {
        // Redirect to the recipe page if the login was successful
        if (this.state.redirectToRecipes) {
            return <Navigate to="/recipes" />;
        }

      return (
        
        <div className="loginPage">
              <form className="loginForm">
                <h3 style={{alignSelf: "center"}}>Welcome Back</h3>
                  <label>
                        <input className="Login_Username" type="text" name="username" onChange={this.handleInputChange} placeholder="Username"/>
                  </label>
                  <label>
                      <input className="Login_Password" type="password" name="password" onChange={this.handleInputChange} placeholder="Password" />
                  </label>
                  <br />
                  <button className="Login_Button" type="button" onClick={this.handleLogin}>Log in</button>
                  <Link to="/signUp" style={{textDecoration:"none", margin:"1rem 3rem", cursor:"pointer", color:"black"}}>Don't Have an Account?</Link>
                  <Link to="/" style={{textDecoration:"none", margin:"0 3rem", cursor:"pointer", color:"black"}}>Back to Home</Link>
              </form>
        </div>
    );
  }
}
