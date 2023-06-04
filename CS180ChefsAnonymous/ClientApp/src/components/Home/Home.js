import React, { Component } from 'react';
import './Home.css';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <>
        <div className='subtitle1'>Plan, Shop, Cook:</div>
        <div className='subtitle2'>Simplify Your Culinary Journey!</div>
        {/* <div className='title'>Chefs Anonymous</div> */}
        <div className='btn'>
          <Link to="/logIn" style={{textDecoration:"none"}}><Button className='btn-login'>Log In</Button></Link>
          <Link to="/signUp" style={{textDecoration:"none"}}><Button className='btn-signup'>Sign Up</Button></Link>
        </div>
        <div className='main-img'/>
      </>
    );
  }
}
