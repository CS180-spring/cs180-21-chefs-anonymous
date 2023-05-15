import React, { Component } from 'react';
import backgroundImage from '../../loginBackground.jpg';
import './Login.css';

export class Login extends Component {
  static displayName = Login.name;

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
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
            })
            .catch(error => {
                // Handle any error that occurs during the request
                console.error(error);
            });
    }

  render() {
      return (
        
        <div className="loginPage" style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            height: '100vh'
          }}>
              <form className="loginForm">
                  <label>
                        Username:
                        <input type="text" name="username" onChange={this.handleInputChange} />
                  </label>
                  <label>
                        Password:
                        <input type="password" name="password" onChange={this.handleInputChange} />
                  </label>
                  <br />
                  <button type="button" onClick={this.handleLogin}>Log in</button>
              </form>
        </div>
    );
  }
}
