import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { Content } from './components';

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        header: {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(5),
        }
    })
});

export default function App() { 
      const classes = useStyles();
      return (
        <Container>
            <Typography className={classes.header} variant="h4" component="h1">
              Agents Registry
            </Typography>
            <Content classes={classes.paper}/>
        </Container>
    );
}
