import React from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Icon from '@material-ui/core/Icon';
import { CardActionArea, CardContent } from '@material-ui/core';
import Course from './course'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    justifyContent: 'center',
    display: 'grid',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 200,
  },
  add: {
    marginTop: 80,
  },
  class: {
    marginTop: 50,
  },
  cards: {
    padding: theme.spacing(5),
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
}));


export default function Classes() {
  const classes = useStyles();
  return (
    <Router>
      <Switch>
        <Route path="/course">
          <Course />
        </Route>
        <Route path="/">
          <Container maxWidth="lg" className={classes.container}>
            <Typography component="p" variant="h4">
              Active Courses
      </Typography>
            <Divider orientation="horizontal" variant="fullWidth" />
            <Grid container spacing={1} xs={12}>
              <Grid item spacing={3} xs={4} >
                <div className={classes.cards}>
                  <Link to="/course" className={classes.link}>
                    <ClassCard />
                  </Link>
                </div>
              </Grid>
              <Grid item spacing={3} xs={4} >
                <div className={classes.cards}>
                  <AddClass />
                </div>
              </Grid>
            </Grid>
            <Typography component="p" variant="h4">
              Inactive Courses
      </Typography>
            <Divider orientation="horizontal" variant="fullWidth" />
          </Container>
        </Route>

      </Switch>
    </Router >
  );
}

function ClassCard() {
  const classes = useStyles();
  const fixedHeightCard = clsx(classes.card, classes.fixedHeight);
  return (
    <React.Fragment>
      <Card variant="outlined">
        <CardActionArea className={fixedHeightCard}>
          <CardContent>
            <Typography className={classes.class}>CS 2110</Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
              Spring 2020
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
              Enrolled as Student
      </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </React.Fragment >
  );
}
function AddClass() {
  const classes = useStyles();
  const fixedHeightCard = clsx(classes.card, classes.fixedHeight);

  return (
    <React.Fragment>
      <Card variant="outlined">
        <CardActionArea className={fixedHeightCard}>
          <CardContent >
            <Typography className={classes.add}>Click to Add a Course</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </React.Fragment>
  );
}

export {
  AddClass,
  ClassCard
}