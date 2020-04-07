import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import './App.css';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import books from './Images/books.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function Upload() {
  const classes = useStyles();
  return (
    <div className="middleSection"
        style={{
          backgroundImage:`url(${books})`
      }}>
        <Box component="span" m={1} className="header" style={{textAlign:"center", color:"white"}}>
          <p style={{fontSize: 30}}>Enter a link here</p>
          <TextField id="standard-basic" label="Insert Link Here" variant='filled' style={{backgroundColor: 'white', marginRight: 10}}/>
          <Button style={{marginTop: 10}}
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<CloudUploadIcon />}
          >
            Upload
        </Button>
        </Box>
        <Box component="span" m={1} className="header" style={{textAlign:"center", color:"white"}}>
          <p style={{fontSize: 30}}>OR</p>
          <p style={{fontSize: 30}}>Click here to upload a PDF</p>
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
  );
}

export default Upload;