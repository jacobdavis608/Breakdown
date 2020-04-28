import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';


class Login extends React.Component {
  constructor(){
    super();
    this.state = {
      userInfo: {

      },
      isLoggedIn: false
    };
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  responseFacebook(response) {
    this.setState({
      isLoggedIn: true
    });
  }

  render(){
    if (this.state.isLoggedIn){
      return (
        <div>
            <h1>You are already logged in</h1>
        </div>
      );
    }
    else {
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


