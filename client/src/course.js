import React from 'react';


import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';



import styles from './environment.module.css';
import data from './Student';

export default function Course(props) {
  const classList = data.Courses;
  const getID = classList.map(course => { if (course.split(' ').join('') == props.id) return (course) });

  return (
    <React.Fragment>
      {/* Header of Body */}
      <Container maxWidth="lg" className={styles.container}>
        <Typography component="p" variant="h5">
          {getID}
        </Typography>
        <Divider orientation="horizontal" variant="fullWidth" />
        <Typography component="p" variant="h6">
          Spring 2020
      </Typography>
        <Grid container spacing={1} xs={12} justify="center" className={styles.container}>
          {/* Raising/Lowering Hand Card */}
          <Grid item spacing={3} xs={4}>
            <RaiseHand />
          </Grid>
        </Grid>
        <Grid container spacing={2} justify="left" className={styles.container}>
          <PersonIcon fontSize="large" />
          <Grid item spacing={3} xs={4}>
            <div className={styles.header}>
              <Typography >Staff Activity</Typography>
              <Divider orientation="horizontal" variant="fullWidth" />
            </div>
          </Grid>
          <Grid item spacing={3} xs={3}>
          </Grid>
          <AnnouncementIcon fontSize="large" />
          <Grid item spacing={3} xs={4}>
            <div className={styles.header}>
              <Typography>News Feed</Typography>
              <Divider orientation="horizontal" variant="fullWidth" />
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="stretch" justify="left" className={styles.container}>
          <Grid item xs={2}>
            <div>
              <Typography>Active Staff</Typography>
              <Typography>Students in Queue</Typography>
            </div>
          </Grid>
          <Grid item xs={1} alignItems="stretch">
            <Divider orientation="vertical" />
          </Grid>
          <Grid item xs={2}>
            <Typography>Magd Bayoumi</Typography>
            <Typography>David Gries</Typography>
            <Typography>Nate Foster</Typography>
            <Typography>Tanmay Bansal</Typography>

          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

/* Changes Button and Launches Form for Raising Hand and getting help. Also
   will handle Lowering Hand */
function RaiseHand() {
  const [open, setOpen] = React.useState(false);
  const [hand, setHand] = React.useState("Raise Hand");
  const [raised, setRaise] = React.useState(false)
  const Lower = () => {
    { setOpen(false); setRaise(false); setHand("Raise Hand"); }
  }
  const Raise = () => {
    { setOpen(false); setRaise(true); setHand("Lower Hand"); }
  }
  const ChangeStatus = () => {
    if (raised == false) setOpen(true);
    else Lower();
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
          <Dialog open={open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Question</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please fill out the sections below so that your TA can better help you.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                fullWidth />
            </DialogContent>
            <DialogActions>
              <Button onClick={Lower} color="primary">
                Cancel
          </Button>
              <Button onClick={Raise} color="primary">
                Submit
          </Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
    </React.Fragment >
  );
}

