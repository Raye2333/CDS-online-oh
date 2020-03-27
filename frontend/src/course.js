import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { CardActionArea, CardContent } from '@material-ui/core';

import Classes from './Classes';
import './environment.module.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function raiseHand() {
  return (
    <React.Fragment>
      <Card variant="outlined">
        <CardActionArea className="card">
          <CardContent>
            <Typography className="class">CS 2110</Typography>
            <Typography color="textSecondary">
              Spring 2020
            </Typography>
            <Typography color="textSecondary">
              Enrolled as Student
      </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </React.Fragment >
  );
}

export default function Course() {

  return (
    <Router>
      <Switch>
        <Route path="/course">
          <Container maxWidth="lg" className="container">
            <Typography component="p" variant="h5">
              Class name
            </Typography>
            <Divider orientation="horizontal" variant="fullWidth" />
            <Typography component="p" variant="h6">
              Spring 2020
            </Typography>
            <Grid container spacing={1} xs={12} justify="center" className="container">
              <Grid item spacing={3} xs={4}>
                <raiseHand />
              </Grid>
            </Grid>
          </Container>
        </Route>
        <Route path="/">
          <Classes />
        </Route>
      </Switch>
    </Router>
  );
}
