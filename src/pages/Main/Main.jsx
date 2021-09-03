import { useHistory } from "react-router-dom";
import { ReactComponent as ReactLogo } from '../../styles/images/manot_logo.svg';
import './Main.scss';

function Main() {
    const history = useHistory();

    return (
        <>
            <div className='main_page_container'>
            {/* <div className='gradient1'></div> */}
            {/* <div className='gradient2'></div> */}

                <div className='big_logo_container'>
                    <ReactLogo className='big_logo' />
                    <span className='manot-text'>
                        manot
                    </span>
                </div>

                <div className='button-containers'>
                    <button
                        onClick={() => history.push('/login')}>
                        Sign in
                    </button>
                    <button
                        onClick={() => history.push('/registration')}>
                        Sign up
                    </button>
                </div>
            </div>
        </>
    )
}

export default Main;