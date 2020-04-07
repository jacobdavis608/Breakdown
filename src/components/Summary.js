import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 250,
    maxWidth: 600
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} style={{marginTop:50, textAlign:'left'}}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          4/05/20 12:00PM EST
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Genre: Game Theory
        </Typography>
        <Typography variant="h5" component="h2" style={{textDecorationLine: 'underline'}}>
            Risk-Averse Equilibrium Analysis and Computation
        </Typography>
        <Typography variant="body2" component="p" style={{paddingTop: 10}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>
      </CardContent>
      <CardActions>
        <Button href="https://arxiv.org/pdf/2004.02470.pdf" size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}