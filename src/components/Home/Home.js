import React, { Fragment } from 'react';
import './Home.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import books from '../Images/books.jpg';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Summary from '../Summary.js'
const useStyles = makeStyles((theme) => ({
}));

function Home() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className="middleSection"
        style={{
          backgroundImage:`url(${books})`
      }}>
        <Box component="span" m={1} className="header" style={{textAlign:"left", color:"white"}}>
          <h1 style={{paddingLeft: 50, textDecorationLine: 'underline', fontSize: 50}}>Welcome to Breakdown</h1>
          <p style={{paddingLeft: 50, fontSize: 20}}>Trim down the minor details to produce quick summaries of scholarly articles with Breakdown.</p>
        </Box>
        <Box component="span" m={1} className="header" style={{textAlign:"center", color:"white"}}>
          <p style={{fontSize: 30, paddingTop: 55}}>Click here to upload a PDF</p>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<CloudUploadIcon />}
          >
            Upload
        </Button>
        </Box>
      </div>
      <div style={{paddingLeft:'10%'}}>
        <Grid container spacing={4}>
          <Grid item xs={6} sm={6}>
            <Summary/>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Summary/>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Summary/>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Summary/>  
          </Grid>
          <Grid item xs={6} sm={6}>
            <Summary/>  
          </Grid>
          <Grid item xs={6} sm={6}>
            <Summary/>  
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default Home;
