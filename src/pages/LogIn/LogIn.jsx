import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { useHistory } from "react-router-dom";
import Recaptcha from 'react-recaptcha';
import { Link } from '@material-ui/core';

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';

import paths from '../../utils/routing';
import './LogIn.scss';

function LogIn(props) {
    const history = useHistory();
    const [isVerified, setIsVerified] = useState(false);
    const [passwordType, setPasswordType] = useState('password');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [error, setError] = useState('');

    const login = (data) => {
        console.log('data', data);
        fetch('http://localhost:5000/api/v1/login', {
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
                    history.push(paths.Importdata);
                }
                return response.json();
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    const resetPassword = (event) => {
        history.push(paths.Email)
    };

    function handleClick1() {
        (passwordType === 'password') ? setPasswordType('text') : setPasswordType('password');
    }

    function handleVerifyCallback(response) {
        if (response) {
            setIsVerified(true)
        }
    }

    function validate() {
        if (email === '') { setEmailError('Please enter your email') }
        if (password === '') { setPasswordError('Please enter your password') }
    }

    function handleSubmit(event) {
        event.preventDefault();

        const data = {
            email,
            password,
        };

        validate();

       Object.keys(data).length && login(data);
    }

    return (
        <div className='verify_container'>
            <Header />
            {error && <div>{error}</div>}
            <div className='form_wrapper'>
                <form className='form' onSubmit={handleSubmit}>
                    <div className='heading'>Sign in</div>

                    <input
                        type='email'
                        className="email_input"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {!email && emailError && <div className='error_message'>{emailError}</div>}

                    <div className='pass_wrapper'>
                        <input
                            type={passwordType}
                            className='new_password_input'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className='pass_button' onClick={handleClick1}>
                            {(passwordType === 'text') ? <VisibilityOutlinedIcon style={{ fontSize: '22', color: 'grey' }} />
                                : <VisibilityOffOutlinedIcon style={{ fontSize: '22', color: 'grey' }} />
                            }
                        </div>
                    </div>
                    { !password && passwordError && <div className='error_message'>{passwordError}</div>}

                    <Recaptcha
                        className='login_recaptcha'
                        sitekey="6Lco1h8cAAAAAB0Si1bOomVmcyRqCK-OYKhy_7SW"
                        render="explicit"
                        verifyCallback={handleVerifyCallback}
                    />

                    <Link
                        href="#"
                        onClick={resetPassword}
                        className='forgot-password'
                    >
                        Forgot Password?
                    </Link>
                    <button
                        className='save_button'
                        type='submit'
                    >
                        <div className='submit_text'>
                            Sign in
                        </div>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LogIn;