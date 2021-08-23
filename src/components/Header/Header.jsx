import React from 'react';
import { ReactComponent as ReactLogo } from '../../styles/images/manot_logo.svg';
import './Header.scss';

function Header(props) {
    return (
        <div className='header'>
            <ReactLogo className='manot-logo' />
        </div>
    )
}

export default Header;