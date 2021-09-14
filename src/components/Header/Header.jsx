import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ReactLogo } from '../../styles/images/manot_logo.svg';
import { Button } from '@material-ui/core';
import './Header.scss';

function Header(props) {
    const history = useHistory();
    const path = window.location.pathname;

    return (
        <div className='header'>
            <button
                className="manot-logo-button"
                onClick={() => history.push('/')}
            >
                <ReactLogo className='manot-logo' />
            </button>
            {'/login' === path && <span className='button-container'>
                <Button onClick={() => history.push('/registration')}>
                    Sign Up
                </Button>
            </span>
            }
        </div>
    )
}

export default Header;