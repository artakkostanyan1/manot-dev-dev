import UserHeader from '../../components/UserHeader/UserHeader';
import LeftBar from '../../components/LeftBar/LeftBar';
import RightBar from '../../components/RightBar/RightBar'
import './Desktop.scss';

function Desktop() {
    return (
        <div className='comp-desktop'>
            <UserHeader className='user_header_desktop'/>
            <div className='main-content-container'>
                <LeftBar className='left_bar'/>
                <div className='main-photo'>
                    Main photo
                </div>
                <RightBar />
            </div>
        </div>
    )
}

export default Desktop;