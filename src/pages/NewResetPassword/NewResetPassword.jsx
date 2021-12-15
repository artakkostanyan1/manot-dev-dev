import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import { useHistory } from 'react-router';
import { ReactComponent as SignUpImg } from '../../styles/images/signup_page_img.svg';
import InputComponent from '../../components/InputComponent/InputComponent';
import { Link, useParams } from "react-router-dom";

import paths from '../../utils/routing';

import Loader from '../../components/Loader/Loader';

import './NewResetPassword.scss';

require('dotenv').config();

function NewResetPassword(props) {
    // const [secondView, setSecondView] = useState(true);

    const [emailError, setEmailError] = useState(false);
    const [newPassError, setNewPassError] = useState(false);
    const [repeatPassError, setRepeatPassError] = useState(false);

    const params = useParams();
    const history = useHistory();
    const pathname = window.location.pathname;
    // const host = window.location.host;
    // const pathName = path.slice(host.length + 1);
    console.log('state', pathname);
    const secondView = pathname.includes('reset-password');

    const [email, setEmail] = useState('');
    const [new_pass, setNewPass] = useState('');
    const [repeat_pass, setRepeatPass] = useState('');

    const [error, setError] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    const senEmail = () => {
        fetch(`${apiUrl}forgot-password?email=${email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === 'fail') {
                    throw Error('No user registered.');
                } else if (response.status === 'success') {
                    // setSecondView(false);
                }
            })
            .catch((error) => {
                setEmailError(error.message);
            });
    }

    const resetPass = (data) => {
        // setIsLoading(true);
        fetch(`${apiUrl}reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(response => {
                console.log('res', response);
                if (response.status === 'fail') {
                    throw Error('Error.');
                } else {
                    // setIsLoading(false);
                    history.push(paths.NewLogin);
                }
            })
            .catch((error) => {
                // setError(error.message);
                console.log('err', error);
            });
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePassword(password) {
        return strongRegex.test(`${password}`);
    }

    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})");

    function validate() {
        (email === '' || !validateEmail(email)) ? setEmailError(true) : setEmailError(false);
    }

    function validatePass(password, errorFunction) {
        return password === '', !validatePassword(new_pass) ? errorFunction(true) : errorFunction(false);
    }

    function isPasswordsMatch() {
        return new_pass === repeat_pass ? setError(false) : setError(true);
    }

    function isEmailMissing() {
        return email === '';
    }

    function isPasswordsMissing() {
        return new_pass === '' && repeat_pass === '';
    }

    function handleSubmitEmail(event) {
        event.preventDefault();

        const data = {
            email,
        };

        validate();

        !isEmailMissing() && validateEmail(email) && senEmail(data);
    }

    function handleSubmitPass(event) {
        event.preventDefault();

        const data = {
            new_pass,
            repeat_pass
        };

        validatePass(new_pass, setNewPassError);
        validatePass(repeat_pass, setRepeatPassError);

        !isPasswordsMissing() && !isPasswordsMatch() && validatePassword(new_pass) && validatePassword(repeat_pass) && resetPass(data);
    }

    return (
        <>
            {isLoading ? <Loader /> :
                <div className='registration__wrapper'>
                    <div className='signup__left__part'>
                        <Header />
                        <div className='welcome__header'>
                            {'welcome to '}
                            <b>
                                manot
                            </b>
                        </div>
                        <SignUpImg className='signup__page__image' />
                    </div>
                    <div className='signup__right__part'>
                        <div className='signin__fields__wrapper'>
                            <div className='signup__fields__header'>
                                reset password
                            </div>
                            {!secondView ?
                                <>
                                    <div className='reset__fields__wrapper'>
                                        Enter the email assiciated with your account, and we will send an email with a link to reset your password.
                                    </div>
                                    <div className='reset__input__wrapper'>
                                        <InputComponent label='email' value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setEmailError(false)} error={emailError} />
                                    </div>
                                    {emailError && <div className='error__message email__error__message__wrapper'> {emailError} </div>}
                                </> :
                                <div className='pass__input__wrapper'>
                                    <InputComponent type='password' label='new password' value={new_pass} onChange={(e) => setNewPass(e.target.value)} onFocus={() => setNewPassError(false)} error={newPassError} />
                                    <InputComponent type='password' label='repeat new paaword' value={repeat_pass} onChange={(e) => setRepeatPass(e.target.value)} onFocus={() => setRepeatPassError(false)} error={repeatPassError} />
                                    {error && <div className='error__message pass_error__message__wrapper'  >Passwords don't match</div>}
                                </div>
                            }
                            <div className='signin__button__wrapper'>
                                <button
                                    type='submit'
                                    className='button__component'
                                    onClick={!secondView ? handleSubmitEmail : handleSubmitPass}
                                >
                                    {!secondView ? 'send email' : 'reset'}
                                </button>
                            </div>
                        </div>
                        <Link className='redirect__to__reset__password' to={paths.NewLogin} >login</Link>
                        <hr className='divider' />
                        <div className="dont_have_account">Don't have an account?</div>
                        <div className='signup2__button__wrapper'>
                            <button
                                type='submit'
                                className='button__component'
                                onClick={() => history.push(paths.NewRegistration)}
                            >
                                sign up
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default NewResetPassword;