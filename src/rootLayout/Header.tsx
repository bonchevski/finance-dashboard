import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { makeStyles } from '@mui/styles';

// TODO: generate a theme later
const useStyles = makeStyles(() => ({
    logo: {
        margin: "0 16px",
    },
    title: {
        flexGrow: 1,
        textAlign: 'center',
    },
    mobileMenuButton: {
       marginRight: "0 16px",
    },
    desktopMenu: {
        // Add your styles for the desktop menu here
    },
}));

const Header: React.FC = () => {
    const classes = useStyles();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMobileMenuOpen = () => {
        setMobileMenuOpen(true);
    };

    const handleMobileMenuClose = () => {
        setMobileMenuOpen(false);
    };

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const renderDesktopMenu = () => {
        return (
            <div className={`${classes.desktopMenu} ${!mobileMenuOpen ? 'show' : 'hide'}`}>
                <MenuItem component={Link} to="/home">
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </MenuItem>
                <MenuItem component={Link} to="/finance">
                    <ListItemIcon>
                        <AttachMoneyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Finance" />
                </MenuItem>
            </div>
        );
    };

    const renderMobileMenu = () => {
        return (
<div className={`${classes.mobileMenuButton} ${mobileMenuOpen ? 'show' : 'hide'}`}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMobileMenuOpen}
                >
                    <MenuIcon />
                </IconButton>
                <Drawer anchor="right" open={mobileMenuOpen} onClose={handleMobileMenuClose}>
                    <List>
                        <ListItem button component={Link} to="/home">
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem button component={Link} to="/finance">
                            <ListItemIcon>
                                <AttachMoneyIcon />
                            </ListItemIcon>
                            <ListItemText primary="Finance" />
                        </ListItem>
                    </List>
                </Drawer>
            </div>
        )
            
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <img src="/path/to/logo.png" alt="Logo" className={classes.logo} />
                <Typography variant="h6" className={classes.title}>
                    Finance Dashboard
                </Typography>
                {renderDesktopMenu()}
                <IconButton color="inherit" onClick={handleProfileMenuOpen}>
                    <AccountCircleIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleProfileMenuClose}
                >
                    <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
                    <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
                </Menu>
                {renderMobileMenu()}
            </Toolbar>
        </AppBar>
    );
};

export default Header;