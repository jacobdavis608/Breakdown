import React from 'react';
import './App.css';
import Summary from './Summary.js';
import Grid from '@material-ui/core/Grid';
import Cookies from 'universal-cookie';
const cookies = new Cookies();



class Profile extends React.Component {
  constructor(){
    super();
    this.state = {
      start: 0,
      end: 10,
    }
    this.getSummaries = this.getSummaries.bind(this);
  }
  getSummaries(){
    return(
      <div>
        <h1>
          Profile Page
        </h1>
        <p>
          You are logged in.
        </p>
      </div>
    )
    /* ADD SOMETHING LIKE THIS INSTEAD BUT mapped from the a list of summaries given by response from fetch
      return (
      <React.Fragment>
        <div>
          <h1>Profile Page</h1>
        </div>
        <div style={{paddingLeft:'10%'}}>
          <Grid container spacing={4}>
            <Grid item xs={6} sm={6}>
              <Summary cards={info[0]}/>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Summary cards={info[1]}/>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Summary cards={info[2]}/>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Summary cards={info[3]}/>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Summary cards={info[4]}/>  
            </Grid>
            <Grid item xs={6} sm={6}>
              <Summary cards={info[5]}/>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Summary cards={info[6]}/>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Summary cards={info[7]}/>
            </Grid>
          </Grid> 
        </div>
      </React.Fragment>
    */
  }
  
  render(){
    const loggedIn = cookies.get('isLoggedIn');
    if (loggedIn == 'yes'){
      return(
        <React.Fragment>
          {this.getSummaries()}
        </React.Fragment>
      )
    }
    else {
      return(
        <React.Fragment>
          <div>
            <h1>
              Please navigate to the Login page to log in.
            </h1>
          </div>
        </React.Fragment>
      )
    }
  }
}

export default Profile;
