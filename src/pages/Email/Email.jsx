import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { useHistory } from 'react-router';
import paths from '../../utils/routing';
import './Email.scss';

function Email() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    // TO DO: /////////////////////////////////////////////////////Email api path
    const sendEmail = (data) => {
        console.log('data', data);
        fetch('http://localhost:5000/api/v1/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    setError(response.statusText);
                } else {
                    history.push(paths.ResetPassword);
                }
                return response.json();
            })
            .catch((error) => {
                setError(error.message);
            });
        }

    const handleSubmit = (event) => {
        event.preventDefault();
        sendEmail(email);
    }
    return (
        <div className='email_container'>
            <Header />
            {error && <div>{error}</div>}
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