import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { useHistory } from 'react-router';
import { sendEmail } from '../../services/apicalls';
import paths from '../../utils/routing';
import './Email.scss';

function Email() {
    const history = useHistory();
    const [email, setEmail] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        // sendEmail(email) &&
        history.push(paths.ResetPassword);
    }
    return (
        <div className='email_container'>
            <Header />
            <div className='form_wrapper'>
                <form className='form' onSubmit={handleSubmit}>
                    <div className='heading'>Confirm Email</div>
                    <input
                        type='email'
                        className="email_input"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                    <button
                        className='submit_button'
                        type='submit'
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Email;