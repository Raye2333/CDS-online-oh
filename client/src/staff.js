import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
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
import FaceIcon from '@material-ui/icons/Face';
import EcoIcon from '@material-ui/icons/Eco';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

import styles from './environment.module.css';
import data from './Waitlist';

/* Display Course page after selecting a course */
export default function Course(props) {
  /* Arbitrary json file just to test and learn data-driven principles */
  const classList = data.Courses;
  const getID = classList.map(course => {
    if (course.name.split(' ').join('') == props.id)
      return (course.name)
  });
  const getActive = classList.map(course => {
    if (course.name.split(' ').join('') == props.id) return (
      <Typography>{course.active}</Typography>
    );
  });
  const getOccupied = classList.map(course => {
    if (course.name.split(' ').join('') == props.id) return (
      <Typography>{course.occupied}</Typography>
    );
  });

  const StaffActive = classList.map(course => {
    if (course.name.split(' ').join('') == props.id) return (
      course.Staff.map(staffer => {
        if (staffer.status == "available") {
          return (
            <Typography>{staffer.name}</Typography>
          );
        }
      })
    );
  })

  const StaffOccupied = classList.map(course => {
    if (course.name.split(' ').join('') == props.id) return (
      course.Staff.map(staffer => {
        if (staffer.status == "occupied") {
          return (
            <Typography>{staffer.name}</Typography>
          );
        }
      })
    );
  })

  const students = classList.map(course => {
    if (course.name.split(' ').join('') == props.id) return (
      course.Students.map(stud => {
        if (stud.waiting == "yes") {
          return (
            <Typography>{stud.name}</Typography>
          );
        }
      })
    );
  })
  const news = classList.map(course => {
    if (course.name.split(' ').join('') == props.id) return (
      <Typography>{course.News}</Typography>
    );
  })
  const QueueNum = classList.map(course => {
    if (course.name.split(' ').join('') == props.id) return (
      course.Queue
    );
  })
  const QueueRemove = classList.map(course => {
    if (course.name.split(' ').join('') == props.id) return (
      course.Queue - 1
    );
  })
  const QueueAdd = classList.map(course => {
    if (course.name.split(' ').join('') == props.id) return (
      course.Queue + 1
    );
  })

  return (
    <React.Fragment>
      {/* Header of Body */}
      <Container maxWidth="lg" className={styles.container}>
        <Container spacing={2} justify="left" className={styles.container}>
          <Typography component="p" variant="h5">
            {getID}
          </Typography>
          <Divider orientation="horizontal" variant="fullWidth" />
          <Typography component="p" variant="h6">
            Spring 2020
          </Typography>
        </Container>

        {/* Raising/Lowering Hand Card */}
        <Container maxWidth="lg" className={styles.container}>
          <Grid container spacing={2} justify="left" className={styles.container}>
            <FaceIcon fontSize="large" />
            <Grid item spacing={3} xs={4}>
              <div className={styles.header}>
                <Typography >Student Waiting: {QueueNum}</Typography>
                <Divider orientation="horizontal" variant="fullWidth" />
              </div>
            </Grid>
            <Grid item spacing={3} xs={2}></Grid>
            <EcoIcon fontSize="large" />
            <Grid item spacing={3} xs={3}>
              <div className={styles.header}>
                <Typography>Post News</Typography>
                <Divider orientation="horizontal" variant="fullWidth" />
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2} justify="left" className={styles.container}>
            <Grid item xs={1}></Grid>
            <Grid item xs={4}>
              <div>{students}</div>
            </Grid>
            <Grid item spacing={5} xs={2}>
            </Grid>
            <Grid item spaceing={9} xs={3}>
              <PostNews id={props.id} />
            </Grid>
          </Grid>

          {/* Everything Below Queue card (i.e. Active Staff, News Feed) */}
          <Grid container spacing={2} justify="left" className={styles.container}>
            <SupervisedUserCircleIcon fontSize="large" />
            <Grid item spacing={3} xs={4}>
              <div className={styles.header}>
                <Typography >Staff Activity</Typography>
                <Divider orientation="horizontal" variant="fullWidth" />
              </div>
            </Grid>
            <Grid item spacing={3} xs={2}>
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
            <Grid item spacing={1} xs={2}>
              <div>
                <Typography>Available: </Typography>
                {StaffActive}
              </div>
            </Grid>
            <Grid item xs={1} alignItems="stretch">
              <Divider orientation="vertical" />
            </Grid>
            <Grid item xs={2}>
              <div>
                <Typography>Occupied: </Typography>
                {StaffOccupied}
              </div>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={3}>
              {news}
            </Grid>
          </Grid>
        </Container>
      </Container>
    </React.Fragment >
  );
}

/* Changes Button and Launches Form for Raising Hand and getting help. Also
   will handle Lowering Hand */

function LaunchZoom() {
  const [ready, setReady] = React.useState(false)
  const handleOpen = () => {
    setReady(true);
  }
  const handleClose = () => {
    setReady(false);
  }
  return (
    <React.Fragment>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Join the Zoom call!
      </Button>
      <Dialog
        open={ready}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Help is here!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Click the zoom link below and have your question answered:
            zoom.blah.us.com
                </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}


function PostNews(props) {
  const classList = data.Courses;
  const [posting, setPosting] = React.useState(false)
  const toPost = () => {
    setPosting(true);
  }
  const finishPost = () => {
    setPosting(false);
  }
  /* Dialog Form for Posting a news */
  return (
    <React.Fragment>
      <Card variant="outlined" className={styles.card}>
        <CardContent className={styles.alignment}>
          <Typography>You can post a news update that is visible to the whole session</Typography>
          <Container spacing={1} justify="left" className={styles.container}></Container>
          <Button variant="contained" color="primary" id="post" onClick={toPost}>
            Post News
          </Button>
          <Dialog open={posting} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">News Update</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please fill out the sections below so that your news can be updated to the session.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                fullWidth />
            </DialogContent>
            <DialogActions>
              <Button onClick={finishPost} color="primary">
                Cancel
          </Button>
              <Button onClick={finishPost} color="primary">
                Submit
          </Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
    </React.Fragment >
  );
}


