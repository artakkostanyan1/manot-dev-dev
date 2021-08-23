import { Button } from '@material-ui/core';
import { ReactComponent as ReactLogo } from '../../styles/images/manot_logo.svg';
import './Main.scss';

function Main() {
    return (
        <>
            <div className='button-containers'>
                <Button>Log In</Button>
                <Button>Sign Up</Button>
            </div>
            <div className='big-logo'>
                <ReactLogo style={{
                    width: '311px',
                    height: '308px'
                }} />
                <span className='manot-text'>manot</span>
            </div>
        </>
    )
}

export default Main;