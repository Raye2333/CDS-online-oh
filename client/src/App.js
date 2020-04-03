import React from 'react';

/* Importing necessary tags */
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import createHistory from 'history/createBrowserHistory';
import clsx from 'clsx';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

/* Importing Icons*/
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import HistoryIcon from '@material-ui/icons/History';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

/* Impoorting other JS files/pages of webapp*/
import Classes from './Classes';

// Raye's change
//import Course from './course';
import Course from './staff';

import History from './history';
import styles from './environment.module.css';
import Help from './help';
import Settings from './settings'

/* Impoorting necessary Page Navigation tools (React-Router) */
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

/* Copyright function */
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      Your Website
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography >
  );
}
const drawerWidth = 240;

/* Probably bad code but JS Styling for sidebar and heading I got from a template */
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  sidebar: {
    flex: 1,
    justifyContent: 'flex-end',
  }
}));

/* History variable for useful page navigation */
let history = createHistory();

/* main function of the sidebar/heading creation */
export default function Dashboard() {
  const classes = useStyles();
  /* Handles Sidebar open and close */
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const NotFound = () => {
    return (<h1>Page not found.</h1>);
  }

  /* Page navigation methods for History and Home button */
  const refHist = () => {
    history.push("/hist")
    history.go(0);
  }
  const refHelp = () => {
    history.push("/help")
    history.go(0);
  }
  const refSettings = () => {
    history.push("/settings")
    history.go(0);
  }
  const refPage = () => {
    history.push("/");
    history.go(0);
  }
  /* Takes the web url (see index.js) and passes it to course.js in line 246 of this file*/
  let { id } = useParams();

  return (
    <div className={classes.root}>
      <Router >
        <CssBaseline />
        {/*Header and Open/Close SideBar Button*/}
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
              <ChevronRightIcon />
            </IconButton>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerClose}
              className={clsx(classes.menuButton, !open && classes.menuButtonHidden)}>
              <ChevronLeftIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Online-OH
          </Typography>
          </Toolbar>
        </AppBar>

        {/*Side Bar*/}
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, classes.sidebar, !open && classes.drawerPaperClose),
          }}
          open={open}
        ><div style={{ marginBottom: 150 }}>
            <List><div>
              <ListItem button onClick={refPage}>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button onClick={refHist}>
                <ListItemIcon><HistoryIcon /></ListItemIcon>
                <ListItemText primary="History" />
              </ListItem>
            </div>
            </List>
          </div>
          <Divider />
          <List >
            <div>
              <List><div>
                <ListItem>
                  <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                  <Typography>First Last</Typography>
                </ListItem>
                <ListItem button onClick={refSettings}>
                  <ListItemIcon ><SettingsIcon /></ListItemIcon>
                  <ListItemText primary="Account Settings" />
                </ListItem>
                <ListItem button onClick={refHelp}>
                  <ListItemIcon><HelpIcon /></ListItemIcon>
                  <ListItemText primary="Help" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </div></List>
            </div>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />



          {/* Load Content of Each Page with Header above depending on url*/}
          <Switch>
            <Route path="/hist" component={History} />
            <Route exact path="/" component={Classes} />
            <Route path="/help" component={Help} />
            <Route path="/settings" component={Settings} />
            <Route path="/:id">
              <Course id={id} />
            </Route>
            <Route component={NotFound}></Route>
          </Switch>



          <Box className={styles.copyright} pt={28}>
            <Copyright />
          </Box>
        </main>
      </Router >

    </div >

  );
}