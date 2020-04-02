import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import styles from './environment.module.css';

/* Feedback based on Past Sessions (if I understood Magd's vision of this page correctly) */
export default function Settings() {
  const [state, setState] = React.useState({
    checked: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    < Container maxWidth="lg" className={styles.container} >
      <Typography component="p" variant="h5">
        Account Profile
            </Typography>
      <Divider orientation="horizontal" variant="fullWidth" />
      {/* Header of Body */}
      <Grid container spacing={2} justify="left" className={styles.container}>
        <Grid item spacing={3} xs={1}></Grid>
        <Grid item spacing={3} xs={8}>
          <form className={styles.textfields} noValidate autoComplete="off">
            <TextField id="standard-basic" defaultValue="Jerry Sun" label="Full Name" />
          </form>
          <Typography>Email</Typography>
          <Divider orientation="horizontal" variant="fullWidth" />
          <Typography className={styles.textfields}>blah@cornell.edu</Typography>
          <Divider orientation="horizontal" variant="fullWidth" />
          <Typography className={styles.textfields}>Settings</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.checked}
                onChange={handleChange}
                name="checked"
                color="primary"
              />
            }
            label="Do you want email notifications for News Feed?"
          />
        </Grid>
      </Grid >
    </Container >

  );
}