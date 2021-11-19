import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { useHistory } from 'react-router';
import { ReactComponent as SignUpImg } from '../../styles/images/signup_page_img.svg';
import InputComponent from '../../components/InputComponent/InputComponent';
import { Link } from "react-router-dom";

import paths from '../../utils/routing';

import Loader from '../../components/Loader/Loader';
import ErrorPopup from '../../components/ErrorPopup/ErrorPopup';

import './NewRegistration.scss';

require('dotenv').config();

function Registration(props) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmed_pass, setConfirmed_pass] = useState('');

    const [nameError, setNameError] = useState(false);
    const [surnameError, setSurnameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passError, setPassError] = useState(false);
    const [confirmed_passError, setConfirmed_passError] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [accept, setAccept] = useState(false);
    const [isMatched, setIsMatched] = useState(true);
    const [error, setError] = useState('');
    const [togglePopup, setTogglePopup] = useState(false);
    const [helperText, setHelperText] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL;
    const history = useHistory();

    const register = (data) => {
        setIsLoading(true);

        fetch(`${apiUrl}register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (response.status === 422) {
                    throw Error('You already registered with this credentials')
                }
                return response.json();
            })
            .then(response => {
                setIsLoading(false)
                history.push(paths.Verify);
            })
            .catch((error) => {
                setError(error.message);
                setTogglePopup(true);
            });
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validate() {
        name === '' ? setNameError(true) : setNameError(false);
        surname === '' ? setSurnameError(true) : setSurnameError(false);
        (email === '' || !validateEmail(email)) ? setEmailError(true) : setEmailError(false);
        password === '' ? setPassError(true) : setPassError(false);
        confirmed_pass === '' ? setConfirmed_passError(true) : setConfirmed_passError(false);
    }

    function isMissingField() {
        if (name === '' || surname === '' || email === '' || confirmed_pass === '') {
            return false
        } else {
            return true;
        }
    }

    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})");

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            name,
            surname,
            email,
            password,
            confirmed_pass
        }
        validate();

        password !== confirmed_pass ? setIsMatched(false) : setIsMatched(true);

        isMissingField() && (password === confirmed_pass) && strongRegex.test(password) && validateEmail(email) && accept && register(data);
    };

    // const hasAcceptCheckboxErrorBorder = !accept && 'with__err__border';

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
                        <div className='signup__fields__wrapper'>
                            <div className='signup__fields__header'>
                                sign up
                            </div>
                            <div className='signup__inputs__wrapper'>
                                <InputComponent label='first name' value={name} onChange={(e) => setName(e.target.value)} error={nameError} />
                                <InputComponent label='last name' value={surname} onChange={(e) => setSurname(e.target.value)} error={surnameError} />
                                <InputComponent label='email' value={email} onChange={(e) => setEmail(e.target.value)} error={emailError} />
                                <InputComponent label='password' value={password} onChange={(e) => { setPassword(e.target.value) }} error={passError} />
                                {!strongRegex.test(password) && password !== '' &&
                                    <div className='error__message'>Password must contain at least 6 characters, including upper + lowercase, numbers and special symbols[!@#$%^&*]</div>}

                                <InputComponent label='repeat password' value={confirmed_pass} onChange={(e) => setConfirmed_pass(e.target.value)} error={confirmed_passError} />
                            </div>
                            {/* <div className={`terms__policy__checkbox__wrapper ${hasAcceptCheckboxErrorBorder}`}> */}
                            <div className={'terms__policy__checkbox__wrapper'}>
                                <input type="checkbox" className='terms__policy__checkbox' onClick={() => setAccept(!accept)} />
                                {'  Accept our  '}
                                <Link to={paths.Terms} target='_blank'>Terms of Use</Link>
                                {'  and  '}
                                <Link to={paths.Terms} target='_blank'>Privacy Policy</Link>
                            </div>
                            <div className='signup__button__wrapper'>
                                <button
                                    type='submit'
                                    className='button__component'
                                    onClick={handleSubmit}
                                >
                                    sign up
                                </button>
                            </div>
                            <Link className='redirect__to__login' to={paths.Login}>login</Link>
                        </div>
                    </div>

                </div>
            }
        </>
    )
}

export default Registration;