import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { CardActionArea, CardContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import Classes from './Classes'
import styles from './environment.module.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


export default function History() {
  return (
    <Router>
      <Switch>
        <Route path="/hist">
          {/* Header of Body */}
          <Container maxWidth="lg" className={styles.container}>
            <Typography component="p" variant="h5">
              Previous Sessions
            </Typography>
            <Divider orientation="horizontal" variant="fullWidth" />
            <Grid container spacing={1} justify="left" className={styles.container}>
              <Grid item spacing={2} xs={6}>
                <div className={styles.cards}>
                  <PastSession />
                </div>
              </Grid>
              <Grid item spacing={2} xs={6}>
                <div className={styles.cards}>
                  <PastSession />
                </div>
              </Grid>

            </Grid>
          </Container>
        </Route>
        <Route exact path="/" component={Classes} />

      </Switch>
    </Router>
  );
}

function FeedbackForm() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Feedback
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Feedback To Developers</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If there's any feedback you would like us developers know, please let us know.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function PastSession() {
  return (
    <React.Fragment>
      <Card variant="outlined" className={styles.card}>
        <CardContent className={styles.alignment}>
          <Typography>*Session Information like date, duration, participants, and class displayed here.*</Typography>
        </CardContent>
        <CardContent className={styles.alignment}>
          <FeedbackForm />
        </CardContent>
      </Card>
    </React.Fragment >
  );
}