import { useState } from 'react';
import UserHeader, { CustomMenu } from '../../components/UserHeader/UserHeader';
import './DashBoard.scss';

function DashBoard() {
    const [toggleMenu, setToggleMenu] = useState(false);
    const showMenu = toggleMenu ? 'show__menu' : 'hide__menu';
    const handleToggle = (data) => {
        setToggleMenu(data)
    }
    return (
        <>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                <div className={`profile_container ${showMenu}`}>
                    <UserHeader handleToggle={handleToggle} showBurger={toggleMenu} />
                </div>
                {toggleMenu && <CustomMenu handleToggle={handleToggle} />}
            </div>
        </>
    )
}
export default DashBoard;