import React from 'react';
import './App.css';
import trinity from './Images/trinityCollege.jpg';
//import Button from '@material-ui/core/Button';
import FacebookLogin from 'react-facebook-login';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


class Login extends React.Component {
  constructor(){
    super();
    this.state = {
      isLoggedIn: false,
    }

    this.responseFacebook = this.responseFacebook.bind(this);
    this.logout = this.logout.bind(this);
  }

  responseFacebook(response) {
    cookies.set('isLoggedIn', 'yes', { path: '/' });
    cookies.set('userID', response.userID, { path: '/'});
    this.setState({
      isLoggedin: true
    })
  }

  logout(){
    cookies.set('isLoggedIn', 'no', {path: '/'});
    cookies.remove('userID');
    this.setState({
      isLoggedIn: false
    });
  }

  render(){
    if (cookies.get('isLoggedIn') == 'yes'){
      return (
        <div style={{
          backgroundImage:`url(${trinity})`,
          height: '800px',
          paddingTop: '200px'
        }}>
            <h1 style={{color:'white'}}>You are logged in!</h1>
            <button onClick={this.logout}>
              Logout
            </button>
        </div>
      );
    }
    else{
      return (
        <div style={{
          backgroundImage:`url(${trinity})`,
          height: '800px'
        }}>
            <h1>Login Page</h1>
              <FacebookLogin
                appId="247286716513693"
                fields="name,email,picture"
                scope="public_profile"
                callback={this.responseFacebook}
              />
          </div>
        );
      }
    }
  }

export default Login;


