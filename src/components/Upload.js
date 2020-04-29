import React from 'react';
import './App.css';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import books from './Images/books.jpg';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingSummary: false,
      submitted: false,
      url: "",
      title: "",
      success: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  postUpload(){
    return <div className="middleSection"
    style={{
      backgroundImage:`url(${books})`
  }}>
    <Box component="span" m={1} className="header" style={{textAlign:"center", color:"white"}}>
      <p href={this.state.url} style={{fontSize: 30}}>Please wait a moment while we process: {this.state.title}</p>
    </Box>
  </div>
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value}, () => console.log(this.state.url));
  }

  submitted(){
    var userID = cookies.get('userID');
    var api_url = `http://127.0.0.1:5000/summarize?user=${userID}&title=${this.state.title}&url=${this.state.url}`
    console.log(api_url);
    fetch(api_url)
        .then((res) => res.json())
        .then((resJson) => {
          if (resJson.success == 1){
            this.setState({
              submitted: true,
              loadingSummary: false,
              success: true
            })
          } 
          else {
            this.setState({
              submitted: true,
              loadingSummary: false,
              success: false
            });
          }
        }).catch((error)=>console.log(error));


    /*
    setTimeout(() => {
      this.setState({
        submitted: true,
        loadingSummary: false
      }, () => console.log(this.state.submitted));
    }, 5000)*/
  }

  uploadPress(){
    this.setState({loadingSummary: true}, () => this.submitted());
  }

  uploadAnotherPress(){
    this.setState({loadingSummary: false, submitted: false, success: false})
  }

  postSubmission(){
    if (this.state.success == 1){
        return <div className="middleSection"
      style={{
        backgroundImage:`url(${books})`
      }}>
      <Box component="span" m={1} className="header" style={{textAlign:"center", color:"white"}}>
        <p style={{fontSize: 30}}>PDF submitted! Go to your Profile page to view it, or upload another PDF...</p>
      </Box>
      <Button
          variant="contained"
          color="default"
          onClick={() => this.uploadAnotherPress()}
          startIcon={<CloudUploadIcon />}
      >
          Upload another
      </Button>
      }
    </div>
    } 
    else {
      return <div className="middleSection"
      style={{
        backgroundImage:`url(${books})`
      }}>
      <Box component="span" m={1} className="header" style={{textAlign:"center", color:"white"}}>
        <p style={{fontSize: 30}}>Something went wrong with your submission.</p>
        <p style={{fontSize: 30}}>Make sure the url provided is correct</p>
      </Box>
      <Button
          variant="contained"
          color="default"
          onClick={() => this.uploadAnotherPress()}
          startIcon={<CloudUploadIcon />}
      >
          Upload another.
      </Button>
      }
    </div>
    }
  }

  preUpload(){
    const loggedIn = cookies.get('isLoggedIn');
    if (loggedIn == 'yes'){
      return <div className="middleSection"
      style={{
        backgroundImage:`url(${books})`
      }}>
      <Box component="span" m={1} className="header" style={{textAlign:"center", color:"white"}}>
        <p style={{fontSize: 30}}>Enter link and title here</p>
      </Box>
      <Box component="span" m={1} className="header" style={{textAlign:"center", color:"white"}}>
        <TextField name="url" label="Insert Link Here" variant='filled' onChange={this.handleChange} style={{backgroundColor: 'white'}}/> <br/><br/>
        <TextField name="title" label="Insert Title Here" variant='filled' onChange={this.handleChange} style={{backgroundColor: 'white'}}/> <br/><br/>
        <Button
          variant="contained"
          color="default"
          onClick={() => this.uploadPress()}
          startIcon={<CloudUploadIcon />}
        >
          Upload
      </Button>
      </Box>
      </div>
    }
    else {
      return <div className="middleSection"
      style={{
        backgroundImage:`url(${books})`
      }}>
        <Box component="span" m={1} className="header" style={{textAlign:"center", color:"white"}}>
          <p style={{fontSize: 30}}>Please navigate to Login page to log in.</p>
        </Box>
      </div>
    }
  }

  render() {
    if(this.state.loadingSummary && !this.state.submitted){
      return (
        <React.Fragment>
          {this.postUpload()}
        </React.Fragment>
      );
    }
    else if (!this.state.loadingSummary && this.state.submitted){
      return (
        <React.Fragment>
          {this.postSubmission()}
        </React.Fragment>
      );
    }
    else {
      return (
        <React.Fragment>
          {this.preUpload()}
        </React.Fragment>
      );
    }
  }
}

export default Upload;
