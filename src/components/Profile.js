import React from 'react';
import './App.css';
import Summary from './Summary.js';
import Grid from '@material-ui/core/Grid';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import Button from '@material-ui/core/Button';
import Cookies from 'universal-cookie';
import books from './Images/books.jpg';
import Box from '@material-ui/core/Box';
const cookies = new Cookies();

class Profile extends React.Component {
  constructor(){
    super();
    this.state = {
      start: 0,
      end: 10,
      summaries: [],
      loading: false,
      total_user_summaries: 0
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
        <div style={{paddingLeft:'10%', paddingRight: '10%'}}>
          <p>
            Loading summaries...
          </p>
        </div>
      );
    }
    else {
      if (this.state.summaries.length == 0){
        return (
          <div style={{paddingLeft:'10%', paddingRight: '10%'}}>
            <p>
              Navigate to the Upload page to start summarizing!
            </p>
          </div>
        );
      } else {
        return (
          <div style={{paddingLeft:'10%', paddingRight: '10%'}}>
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
  }

  fetchSummaries(){
    var userID = cookies.get('userID');
    var api_url = `http://ec2-18-204-19-57.compute-1.amazonaws.com/get_summaries?user=${userID}&start=${this.state.start}&end=${this.state.end}`
    fetch(api_url)
        .then((res) => res.json())
        .then((resJson) => {
          this.setState({
            summaries: resJson.summaries,
            loading: false,
            total_user_summaries: resJson.total_summaries
          })
        }).catch((error)=>console.log(error));
  }

  loadSummaries(){
    //indicate that the summaries are loading, define callback to be the actual fetch
    this.setState({
      loading: true
    }, () => this.fetchSummaries());
  }
  
  incrementRange(){
    if (this.state.end < this.state.total_user_summaries){
      this.loadSummaries();
      this.setState({
        start: this.state.start + 10,
        end: this.state.end + 10,
      });
    }
  }

  decrementRange(){
    if (this.state.start >= 10){
      this.loadSummaries();
      this.setState({
        start: this.state.start - 10,
        end: this.state.end - 10,
      });
    }
  }

  render(){
    const loggedIn = cookies.get('isLoggedIn');
    if (loggedIn == 'yes'){
      return(
        <React.Fragment>
          <div 
          style={{
            backgroundImage:`url(${books})`
          }}>
            <Box component="span" m={1} className="header" style={{textAlign:"center", color:"white"}}>
              <p style={{fontSize: 30}}>Your Summaries</p>
            </Box>
          </div>
          <div>
          
          {this.renderSummaries()}

          <div style={{minWidth: '700px', marginLeft: '28vw'}}>
          <Grid  container spacing={1}>
            <Grid container item xs={2}>
              <Button
              variant="text"
              color="default"
              onClick={() => this.decrementRange()}
              startIcon={<ArrowLeftIcon />}
              />
            </Grid>
            <Grid container item xs={4}>
            <p style={{fontSize: 20, color: "white"}}>Summaries {this.state.start+1} - {(this.state.end > this.state.total_user_summaries)? this.state.total_user_summaries: this.state.end}</p>
            </Grid> 
            <Grid container item xs={2}>
              <Button
              variant="text"
              color="default"
              onClick={() => this.incrementRange()}
              startIcon={<ArrowRightIcon />}
              /> 
            </Grid>
          </Grid>
          </div>
          </div>
        </React.Fragment>
      )
    }
    else {
      return(
        <React.Fragment>
           <div className="middleSection"
          style={{
            backgroundImage:`url(${books})`
          }}>
            <Box component="span" m={1} className="header" style={{textAlign:"center", color:"white"}}>
              <p style={{fontSize: 30}}>Please navigate to Login page to log in.</p>
            </Box>
          </div>
        </React.Fragment>
      )
    }
  }
}

export default Profile;
