import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';
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
        <div>
            <h1>You are logged in</h1>
            <button onClick={this.logout}>
              Logout
            </button>
        </div>
      );
    }
    else{
      return (
        <div>
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


