import UserHeader from '../../components/UserHeader/UserHeader';
import LeftBar from '../../components/LeftBar/LeftBar';
import RightBar from '../../components/RightBar/RightBar'
import './Desktop.scss';

function Desktop() {
    return (
        <div className='comp-desktop'>
            <UserHeader />
            <div className='main-content-container'>
                <LeftBar />
                <div className='main-photo'>
                    Main photo
                </div>
                <RightBar />
            </div>
        </div>
    )
}

export default Desktop;