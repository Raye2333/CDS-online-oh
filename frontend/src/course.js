import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { CardActionArea, CardContent } from '@material-ui/core';
import PanToolRoundedIcon from '@material-ui/icons/PanToolRounded';
import PersonIcon from '@material-ui/icons/Person';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import Classes, { ClassCard } from './Classes';
import styles from './environment.module.css'


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default function Course() {

  return (
    <Router>
      <Switch>
        <Route path="/course">
          <Container maxWidth="lg" className={styles.container}>
            <Typography component="p" variant="h5">
              Class name
            </Typography>
            <Divider orientation="horizontal" variant="fullWidth" />
            <Typography component="p" variant="h6">
              Spring 2020
            </Typography>
            <Grid container spacing={1} xs={12} justify="center" className={styles.container}>
              <Grid item spacing={3} xs={4}>
                <RaiseHand />
              </Grid>
            </Grid>
            <Grid container spacing={1} xs={12} justify="left" className={styles.container}>
              <PersonIcon />
              <Grid item spacing={3} xs={4}>

                <Typography>Staff Activity</Typography>
                <Divider orientation="horizontal" variant="fullWidth" />
              </Grid>
              <Grid item spacing={3} xs={2}>
              </Grid>
              <AnnouncementIcon />
              <Grid item spacing={3} xs={4}>
                <Typography>News Feed</Typography>
                <Divider orientation="horizontal" variant="fullWidth" />
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

function RaiseHand() {
  const [hand, setHand] = React.useState("Raise Hand");
  const [raised, setRaise] = React.useState(false)
  const ChangeStatus = () => {
    if (raised == false) { setRaise(true); setHand("Lower Hand"); }
    else { setRaise(false); setHand("Raise Hand"); }
  }
  return (
    <React.Fragment>
      <Card variant="outlined" className={styles.card}>
        <CardContent className={styles.alignment}>
          <Typography>Raise your hand if you need help. A short form will have to be filled.</Typography>
        </CardContent>
        <CardContent className={styles.alignment}>
          <Button variant="contained" color="primary" id="hand" value="lowered hand" onClick={ChangeStatus}>
            {hand}
          </Button>

        </CardContent>
      </Card>
    </React.Fragment >
  );
}
