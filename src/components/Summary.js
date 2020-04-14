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


const Summary = props => {
  const classes = useStyles();

  return (
    <Card className={classes.root} style={{marginTop:50, textAlign:'left'}}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.date} {props.time}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Genre: {props.genre}
        </Typography>
        <Typography variant="h5" component="h2" style={{textDecorationLine: 'underline'}}>
            {props.title}
        </Typography>
        <Typography variant="body2" component="p" style={{paddingTop: 10}}>
            {props.summary}
        </Typography>
      </CardContent>
      <CardActions>
        <Button href={props.url} size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

Summary.defaultProps = {
  date: '04/01/20',
  time: '12:00PM EST',
  genre: 'GENRE',
  title: 'TITLE',
  summary: 'SUMMARY',
  url: 'https://www.google.com/'
};

export default Summary;