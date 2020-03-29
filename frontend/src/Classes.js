import React from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { CardActionArea, CardContent } from '@material-ui/core';
import Course from './course';
import History from './history';
import styles from './environment.module.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


/* Body of Home Page, Creates Necessary Cards */

export default function Classes() {
  return (
    <Router>
      <Switch>
        <Route path="/course" component={Course} />
        <Route path="hist" component={History} />
        <Route path="/">
          <Container maxWidth="lg" className={styles.container}>
            <Typography component="p" variant="h4">
              Active Courses
            </Typography>
            <Divider orientation="horizontal" variant="fullWidth" />
            <Grid container spacing={1} xs={12}>
              <Grid item spacing={3} xs={4} >
                <div className={styles.cards}>
                  <Link className={styles.links} to="/course" >
                    <ClassCard />
                  </Link>
                </div>
              </Grid>
              <Grid item spacing={3} xs={4} >
                <div className={styles.cards}>
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

/* Generates Class Card Based on Data */

function ClassCard() {
  return (
    <React.Fragment>
      <Card variant="outlined" className={styles.card}>
        <CardActionArea >
          <CardContent className={styles.alignment}>
            <Typography>CS 2110</Typography>
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

/* Static Add Class Option */
const AddClass = () => {

  return (
    <React.Fragment>
      <Card variant="outlined" className={styles.card}>
        <CardActionArea>
          <CardContent className={styles.alignment}>
            <Typography>Click to Add a Course</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </React.Fragment>
  );
}
