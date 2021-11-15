import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as ReactLogo } from '../../styles/images/manot_logo.svg';
import PersonIcon from '@material-ui/icons/Person';
import paths from '../../utils/routing';
import './UserHeader.scss';

require('dotenv').config();

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
    const [userName, setUserName] = React.useState('');
    const open = Boolean(anchorEl);
    const history = useHistory();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch(`${apiUrl}get-user`, {
            method: 'GET',
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.status === 'fail' && data.message === 'Token is invalid') {
                    localStorage.removeItem('token');
                    history.push(paths.Main)
                }
                setUserName(data.message.name);
            })
    }, [])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseLogout = () => {
        setAnchorEl(null);
        localStorage.removeItem('token');
    }

    return (
        <div className='header'>
            <button
                className="manot-logo-button"
                onClick={() => history.push(paths.Importdata)}
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
                    <Link className='menu_link' to={paths.Profile}>
                        Profile and password
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>Payment method</MenuItem>
                <MenuItem onClick={handleCloseLogout}>
                    <Link className='menu_link' to={paths.Main}>
                        Logout
                    </Link>
                </MenuItem>
            </Menu>
            <div className='user-name'>

                <Link to={paths.Importdata}>
                    {userName}
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