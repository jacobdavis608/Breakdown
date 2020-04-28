import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../Images/bd_logo.png';

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
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <img src={logo} style={{height: "50px", width: "50px", borderRadius: "200/2"}} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          </Typography>
          <Button component={Link} to="/" color="inherit">Home</Button>
          <Button component={Link} to="/upload" color="inherit">Upload</Button>
          <Button component={Link} to="/trending" color="inherit">Trending</Button>
          <Button component={Link} to="/profile" color="inherit">Profile</Button>  
          <Button component={Link} to="/login" color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default Navigation;