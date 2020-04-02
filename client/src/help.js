import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';


import styles from './environment.module.css';

/* Feedback based on Past Sessions (if I understood Magd's vision of this page correctly) */
export default function Help() {
  return (
    < Container maxWidth="lg" className={styles.container} >
      {/* Header of Body */}

      <Typography component="p" variant="h5">
        Frequently Asked Questions
            </Typography>
      <Divider orientation="horizontal" variant="fullWidth" />
      <Grid container spacing={1} className={styles.container}>
        <Grid item spacing={2} xs={12}>
          <Card variant="outlined" className={styles.help}>
            <CardContent>
              <Typography>How to use this website:</Typography>
              <Typography>blah</Typography>
              <Typography>blah</Typography>
              <Typography>blah</Typography>
              <Typography>blah</Typography>
              <Typography>blah</Typography>
              <Typography>Troubleshooting:</Typography>
              <Typography>blah</Typography>
              <Typography>blah</Typography>
              <Typography>Any feedback on your zoom session?</Typography>
              <Typography>blah</Typography>
              <Typography>blah</Typography>
              <Typography>Where can you contact us?</Typography>
              <Typography>blah</Typography>


            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Container >

  );
}