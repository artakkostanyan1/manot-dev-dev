import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ReactLogo } from '../../styles/images/manot_logo_pink.svg';
import { Button } from '@material-ui/core';
import paths from '../../utils/routing';
import './Header.scss';

function Header(props) {
    const history = useHistory();
    const path = window.location.pathname;

    return (
        <div className='header1'>
            <button
                className="manot-logo-button"
                onClick={() => history.push(paths.Main)}
            >
                <ReactLogo className='manot-logo' />
            </button>
            {paths.Login === path && <span className='button-container'>
                <Button onClick={() => history.push(paths.SignUp)}>
                    Sign Up
                </Button>
            </span>
            }
        </div>
    )
}

export default Header;