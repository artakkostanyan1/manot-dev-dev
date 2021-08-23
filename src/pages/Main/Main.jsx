import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { ReactComponent as ReactLogo } from '../../styles/images/manot_logo.svg';
import './Main.scss';

function Main() {
    const history = useHistory();

    return (
        <>
            <div className='button-containers'>
                <Button onClick={() => history.push('/login')}>
                    Log In
                </Button>
                <Button onClick={() => history.push('/registration')}>
                    Sign Up
                </Button>
            </div>
            <div className='big-logo-container'>
                <ReactLogo className='big-logo' />
                <span className='manot-text'>
                    manot
                </span>
            </div>
        </>
    )
}

export default Main;