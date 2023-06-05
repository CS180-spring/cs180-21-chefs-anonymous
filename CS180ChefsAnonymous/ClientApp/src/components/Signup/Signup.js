import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';

//import backgroundImage from '../../signupBackground.jpg';
import '../Login/Login.css';

export class Signup extends Component {
  static displayName = Signup.name;

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            fullName: '',
            redirectToLogin: false,
        };
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSignup = (event) => {
        event.preventDefault();
        const { username, password, email, fullName } = this.state;
        const userData = {
            userId: 1,
            name: fullName,
            username: username,
            password: password,
            email: email,
        };
        console.log("userData");

        console.log(userData);


        fetch('api/user/AddUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the API
                console.log(data);
                // Redirect to the login page
                this.setState({ redirectToLogin: true });
            })
            .catch(error => {
                // Handle any error that occurs during the request
                console.error(error);
            });
    }

    render() {
        // Redirect to the recipe page if the login was successful
        if (this.state.redirectToLogin) {
            return <Navigate to="/login" />;
        }

      return (
        
        <div className="signupPage">
              <form className="signupForm">
                <h3 style={{alignSelf: "center"}}>Create Account</h3>
                  <label>
                        <input className="Login_Username" type="text" name="fullName" onChange={this.handleInputChange} placeholder="Fullname"/>
                  </label>
                  
                  <label>
                        <input className="Login_Username" type="text" name="email" onChange={this.handleInputChange} placeholder="Email"/>
                  </label>

                  <label>
                        <input className="Login_Username" type="text" name="username" onChange={this.handleInputChange} placeholder="Username"/>
                  </label>

                  <label>
                      <input className="Login_Password" type="password" name="password" onChange={this.handleInputChange} placeholder="Password" />
                  </label>

                  <br />
                  <button className="Login_Button" type="button" onClick={this.handleSignup}>Sign up</button>
                  <Link to="/logIn" style={{textDecoration:"none", margin:"1rem 3rem", cursor:"pointer", color:"black"}}>Already Have an Account?</Link>
                  <Link to="/" style={{textDecoration:"none", margin:"0 3rem", cursor:"pointer", color:"black"}}>Back to Home</Link>
              </form>
        </div>
    );
  }
}
