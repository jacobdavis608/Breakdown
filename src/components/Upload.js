import React from 'react';
import './App.css';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import books from './Images/books.jpg'

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingSummary: false,
      submitted: false,
      url: "",
      title: "",
      success: 0
    }
    this.handleChange = this.handleChange.bind(this);
  }

  postUpload(){
    return <div className="middleSection"
    style={{
      backgroundImage:`url(${books})`
  }}>
    <Box component="span" m={1} className="header" style={{textAlign:"center", color:"white"}}>
      <p href={this.state.url} style={{fontSize: 30}}>Please wait a couple minutes while we process: {this.state.title}</p>
    </Box>
  </div>
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value}, () => console.log(this.state.url));
  }

  submitted(){
    console.log("this will set Submitted to True, once API says it has been submitted");
    setTimeout(() => {
      this.setState({
        submitted: true,
        loadingSummary: false
      }, () => console.log(this.state.submitted));
    }, 5000)
  }

  uploadPress(){
    console.log('this will set Upload Press to true and do API call');
    this.setState({loadingSummary: true}, () => this.submitted());
  }

  postSubmission(){
    return <div className="middleSection"
    style={{
      backgroundImage:`url(${books})`
  }}>
    <Box component="span" m={1} className="header" style={{textAlign:"center", color:"white"}}>
      <p style={{fontSize: 30}}>PDF submitted! Go to Home page to view it, or upload another PDF...</p>
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

  preUpload(){
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
