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
      summaries: [],
      loading: false
    }
    this.fetchSummaries = this.fetchSummaries.bind(this);
    this.loadSummaries = this.loadSummaries.bind(this);
    this.renderSummaries = this.renderSummaries.bind(this);
  }

  componentDidMount(){
    const loggedIn = cookies.get('isLoggedIn');
    if (loggedIn == 'yes'){
      this.loadSummaries() //load the user's summaries
    }
  }
  
  renderSummaries(){
    if (this.state.loading){
      return (
        <div style={{paddingLeft:'10%'}}>
          <h1>
          Profile Page
          </h1>
          <p>
            Loading summaries...
          </p>
        </div>
      );
    }
    else {
      if (this.state.summaries.length == 0){
        return (
          <div style={{paddingLeft:'10%'}}>
            <h1>
            Profile Page
            </h1>
            <p>
              Navigate to the Upload page to start summarizing!
            </p>
          </div>
        );
      }
      return (
        <div style={{paddingLeft:'10%'}}>
          <h1>
          Profile Page
          </h1>
          <Grid container spacing={4}>
            {this.state.summaries.map(summary => (
              <Grid item xs={6} sm={6}>
                <Summary cards={summary}/>
              </Grid>
            ))}
          </Grid>
        </div>
      );
    }
  }

  fetchSummaries(){
    var userID = cookies.get('userID');
    var api_url = `http://127.0.0.1:5000/get_summaries?user=${userID}&start=${this.state.start}&end=${this.state.end}`
    fetch(api_url)
        .then((res) => res.json())
        .then((resJson) => {
          this.setState({
            summaries: resJson.summaries,
            loading: false
          })
        }).catch((error)=>console.log(error));
  }

  loadSummaries(){
    //indicate that the summaries are loading, define callback to be the actual fetch
    this.setState({
      loading: true
    }, () => this.fetchSummaries());
  }
  
  render(){
    const loggedIn = cookies.get('isLoggedIn');
    if (loggedIn == 'yes'){
      return(
        <React.Fragment>
          {this.renderSummaries()}
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
