import logo from '../../media/logo.png';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import './Header.scss'

function Header() {
    return (
        <div className='header'>
            <img className='manot-logo' src={logo} alt="Logo" />
            <div>
                <span className='user-name'>Maya K.</span>
                <AccountCircleOutlinedIcon
                    style={{
                        width: '70px',
                        height: '38px',
                        marginTop: '31px',
                        color: '#257aaf'
                    }} />
            </div>
        </div>
    )
}

export default Header;