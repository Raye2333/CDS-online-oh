import React from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FaceIcon from '@material-ui/icons/Face';
import EcoIcon from '@material-ui/icons/Eco';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import VideocamIcon from '@material-ui/icons/Videocam';
import MessageIcon from '@material-ui/icons/Message';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Slide from '@material-ui/core/Slide';


/* import for customized menu */
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';

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
      course.active
    );
  });

  const StaffActive = classList.map(course => {
    if (course.name.split(' ').join('') == props.id) return (
      course.Staff.map(staffer => {
        if (staffer.status == "available") {
          return (
            <CustomizedMenus id={staffer.name} />
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
            <CustomizedMenus id={staffer.name} />
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
            <AlertDialogSlide id={stud.name} question={stud.question} />
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
            <Grid item spacing={1} xs={4}>
              <div className={styles.header}>
                <Typography >Staff Activity: {getActive}</Typography>
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

function PostNews() {
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

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

function CustomizedMenus(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        color="primary"
        onClick={handleClick}
        size="large"
      >
        {props.id}
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <MessageIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Chat" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <VideocamIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Zoom" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Email" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <EmojiEmotionsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Greet" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        {props.id}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Question"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.question}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Zoom
          </Button>
          <Button onClick={handleClose} color="primary">
            Chat
          </Button>
          <Button onClick={handleClose} color="primary">
            Mark-solved
          </Button>
          <Button onClick={handleClose} color="primary">
            Mark-unsolved
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}



