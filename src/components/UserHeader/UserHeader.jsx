import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as ReactLogo } from '../../styles/images/manot_logo.svg';
import PersonIcon from '@material-ui/icons/Person';
import './UserHeader.scss';

export const useStyles = makeStyles((theme) => ({
    menuStyle: {
        backgroundColor: '#257AAF',
        color: 'white',
        borderRadius: '13px',
        marginTop: '50px'
    }
}));

function UserHeader(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const history = useHistory();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className='header'>
            <button
                className="manot-logo-button"
                onClick={() => history.push('/')}
            >
                <ReactLogo className='manot-logo' />
            </button>
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
                    <Link className='menu_link' to="/profile">
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

                <Link to="/">
                    User
                </Link>
                <div
                    className='user-account-container'
                    aria-controls="fade-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <PersonIcon
                        className='user-account'
                    />
                </div>
            </div>
        </div>
    )
}

export default UserHeader;