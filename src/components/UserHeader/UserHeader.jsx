import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { Link } from 'react-router-dom';
import { ReactComponent as ReactLogo } from '../../styles/images/manot_logo.svg';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import './UserHeader.scss';

export const useStyles = makeStyles((theme) => ({
    menuStyle: {
        backgroundColor: '#257AAF',
        color: 'white',
        borderRadius: '13px',
        marginTop: '50px'
    },
    iconStyle: {
        color: '#257aaf',
        marginLeft: '10px'
    }
}));

function UserHeader(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className='header'>
            <ReactLogo className='manot-logo' />
            <Menu
                id="fade-menu"
                classes={{ paper: classes.menuStyle }}
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleClose}>
                    <Link className='menu_link' to="/registration">
                        Profile and password
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>Payment method</MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link className='menu_link' to="/main">
                        Logout
                    </Link>
                </MenuItem>
            </Menu>
            <div className='user-name'>

                <span>Maya K.</span>

                <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
                    <AccountCircleOutlinedIcon
                        classes={{ paper: classes.iconStyle }}
                    />
                </Button>
            </div>
        </div>
    )
}

export default UserHeader;