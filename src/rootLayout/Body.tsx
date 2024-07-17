import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Outlet } from 'react-router';

const useStyles = makeStyles((theme) => ({
    body: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '0 16px',
        [theme.breakpoints.up('sm')]: {
            padding: '0 32px',
        },
    },
}));

const Body: React.FC = () => {
    const classes = useStyles();

    return <div className={classes.body}><Outlet/></div>;
};

export default Body;