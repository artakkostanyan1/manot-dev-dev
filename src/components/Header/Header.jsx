import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ReactLogo } from '../../styles/images/manot_logo.svg';
import './Header.scss';

function Header(props) {
    const history = useHistory();

    return (
        <div className='header'>
             <button
                className="manot-logo-button"
                onClick={() => history.push('/main')}
            >
                <ReactLogo className='manot-logo' />
            </button>
        </div>
    )
}

export default Header;