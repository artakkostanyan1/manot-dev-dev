import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { useHistory } from 'react-router';
import paths from '../../utils/routing';
import './Email.scss';

require('dotenv').config();

function Email() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [isEmailEmptyErr, setIsEmailEmptyErr] = useState('');
    const [error, setError] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;

    // TO DO: /////////////////////////////////////////////////////Email api path
    const sendEmail = (data) => {
        console.log('data', data);
        fetch(`${apiUrl}email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    setError(response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data.token);
                history.push(paths.ResetPassword);
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(email === '') {
            setIsEmailEmptyErr('Please enter your email to reset your password');
        } 

        (email !== '') && sendEmail(email);
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
                        onFocus={() => {
                            setIsEmailEmptyErr('');
                        }}
                    />
                     {isEmailEmptyErr && <div className='error_message'>{isEmailEmptyErr}</div>}
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