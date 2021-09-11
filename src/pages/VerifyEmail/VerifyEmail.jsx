import Header from '../../components/Header/Header';
import EmailIcon from '@material-ui/icons/Email';
import { useHistory } from 'react-router-dom';

import './VerifyEmail.scss';

function VerifyEmail() {
    const history = useHistory();
    return (
        <div className='verify-email-main-container'>
            <Header />
            <div className='verify-email-container'>
                <EmailIcon />
                <div className='verify-email-body'>
                    <h2>Verify your Email</h2>
                    <p>
                        We have sent an email to example@gmail.com.
                    </p>
                    <p>
                        You need to verify your email to continue.
                        If you have not recived the verification email,
                        please check your "Spam" or "Bulk Email" folder.
                        You can also click the resend button below to have
                        another email sent to you.
                    </p>
                    <div
                        className='verify-email-button'
                        onClick={() => history.push('/login')}
                    >
                        Check email and continue
                    </div>
                    <div
                        className='verify-email-link'
                        onClick={console.log('resend the verification email')}
                    >
                        Resend verification Email
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail;