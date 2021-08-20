import { ReactComponent as ReactLogo } from '../../media/manot_logo.svg';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import './Header.scss'

function Header() {
    return (
        <div className='header'>
            {/* <img className='manot-logo' src={logo} alt="Logo" /> */}
            <ReactLogo className='manot-logo' />
            <div className='user-name'>
                <span>Maya K.</span>
                <AccountCircleOutlinedIcon
                    style={{
                        // width: '70px',
                        // height: '38px',
                        // marginTop: '18px',
                        color: '#257aaf',
                        // position: 'absolute',
                        marginLeft: '10px',
                        // marginRight: '1.94%',
                        // marginTop: '30px',
                        // marginBottom: '91.32%'
                    }} />
            </div>
        </div>
    )
}

export default Header;