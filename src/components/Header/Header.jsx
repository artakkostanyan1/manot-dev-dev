import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { ReactComponent as ReactLogo } from '../../styles/images/manot_logo.svg';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import './Header.scss'

function Header(props) {
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
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                style={{
                    marginTop: '50px',
                    borderRadius: '13px',
                    // backgroundColor: '#0D517E'
                }}
            >
                <MenuItem onClick={handleClose}>Profile and password</MenuItem>
                <MenuItem onClick={handleClose}>Payment method</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
            <div className='user-name'>

                <span>Maya K.</span>

                <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
                    <AccountCircleOutlinedIcon
                        style={{
                            color: '#257aaf',
                            marginLeft: '10px'
                        }} />
                </Button>
            </div>
        </div>
    )
}

export default Header;