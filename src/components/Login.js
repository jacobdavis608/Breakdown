import React from 'react';
import './App.css';
// import { GoogleSignin, statusCodes } from 'react-native-google-signin';

/*
class Login extends React.Component {
  constructor(){
    super();
    this.state={
      userInfo: {

      },
    };
  }

  render(){
    return (
      <div>
          <h1>Login Page</h1>
      </div>
    );
  }
} */

function Login(){
  return (
    <div>
        <h1>Login Page</h1>
    </div>
  );
}

export default Login;


// import statusCodes along with GoogleSignin

 
// Somewhere in your code
/*
signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    this.setState({ userInfo });
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (f.e. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
}; */