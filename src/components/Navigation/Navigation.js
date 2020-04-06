import styles from './Navigation.css';
import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import logo from './bd_logo.png';

// const theme = createMuiTheme({
//   overrides: {
//     // Style sheet name ⚛️
//     MuiButton: {
//       alignContent: 'stretch',
//       text: {
//         // Some CSS
//         background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//         borderRadius: 3,
//         border: 0,
//         color: 'white',
//         height: 48,
//         padding: '0 30px',
//         boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//       },
//     },
//   },
// });

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    justifyContent: 'left'
  },
}));


const Navigation = () => {
  const classes = useStyles();

  return(
    <div>
      <AppBar title="Breakdown" position="static">
        <Toolbar>
          {/* <IconButton edge="start" color="inherit" aria-label="menu">
          <img src={logo} style={{height: "50px", width: "50px", borderRadius: "200/2"}} />
          </IconButton>
          <Typography variant="h4" color="inherit">
            Breakdown
          </Typography>
          <div className={styles.buttons}>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <Button component={Link} to="/" color="inherit">Home</Button>
              </Grid>
              <Grid item xs={3}>
                <Button component={Link} to="/upload" color="inherit">Upload</Button>
              </Grid>
              <Grid item xs={3}>
                <Button component={Link} to="/trending" color="inherit">Trending</Button>
              </Grid>
              <Grid item xs={3}>
                <Button component={Link} to="/profile" color="inherit">Profile</Button>
              </Grid>
            </Grid>
          </div>
          <div className="buttons">
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <Button component={Link} to="/login" color="inherit">Logout</Button>
              </Grid>
            </Grid>
          </div> */}
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <img src={logo} style={{height: "50px", width: "50px", borderRadius: "200/2"}} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          </Typography>
          <Button component={Link} to="/" color="inherit">Home</Button>
          <Button component={Link} to="/upload" color="inherit">Upload</Button>
          <Button component={Link} to="/trending" color="inherit">Trending</Button>
          <Button component={Link} to="/profile" color="inherit">Profile</Button>  
          <Button component={Link} to="/login" color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default Navigation;