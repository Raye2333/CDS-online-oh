import React from 'react';
import clsx from 'clsx';
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
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Link from '@material-ui/core/Link'

import Classes, { AddClass } from './Classes';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as Routerlink
} from "react-router-dom";
import { render } from '@testing-library/react';


export default function Course() {

  return (
    <Router>
      <Switch>
        <Route path="/course">
          <Typography>hi</Typography>
        </Route>
        <Route path="/">
          <Classes />
        </Route>
      </Switch>
    </Router>
  );
}
