import React, { useState, useEffect } from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Summary from './Summary.js'


function Trending() {
  return (
    <React.Fragment>
      <div style={{textAlign: "left", paddingLeft: '10%', color: 'white', textDecorationLine: 'underline'}}>
          <h1>Currently Popular</h1>
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

export default Trending;
