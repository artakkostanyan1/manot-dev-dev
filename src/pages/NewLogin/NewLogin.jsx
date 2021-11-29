import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import { useHistory } from 'react-router';
import { ReactComponent as SignUpImg } from '../../styles/images/signup_page_img.svg';
import InputComponent from '../../components/InputComponent/InputComponent';
import { Link, useParams } from "react-router-dom";

import paths from '../../utils/routing';

import Loader from '../../components/Loader/Loader';
import ErrorPopup from '../../components/ErrorPopup/ErrorPopup';

import './NewLogin.scss';

require('dotenv').config();

function NewLogin(props) {

    const [emailError, setEmailError] = useState(false);
    const [passError, setPassError] = useState(false);

    const params = useParams();
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const [error, setError] = useState('');
    const [togglePopup, setTogglePopup] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    // const [isFromEmail, setIsFromEmail] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        // setIsFromEmail(params.id.includes('account') ? false : true);

        fetch(`${apiUrl}verify-account`, {
            method: 'PUT',
            headers: {
                "x-access-token": params.id
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setIsLoading(false)
            })

        // const timeId = setTimeout(() => {
        //     setIsFromEmail(false)
        // }, 1800)

        // return () => {
        //     clearTimeout(timeId)
        // }
    }, [])

    const login = (data) => {
        fetch(`${apiUrl}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (response.status === 401) {
                    throw Error('Invalid name or password');
                } else if (response.status === 422) {
                    throw Error('Your account is not active. Please check Your email and verify account.');
                }
                return response.json();
            })
            .then((data) => {
                localStorage.setItem('token', data.token)
                history.push(paths.Importdata);
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
        (email === '' || !validateEmail(email)) ? setEmailError(true) : setEmailError(false);
        password === '' ? setPassError(true) : setPassError(false);
    }

    function isMissingField() {
        if (password === '' || email === '') {
            return true
        } else {
            return false;
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        const data = {
            email,
            password,
        };

        validate();

        !isMissingField() && validateEmail(email) && login(data);
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
                                login
                            </div>
                            <div className='signin__inputs__wrapper'>
                                <InputComponent label='email' value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setEmailError(false)} error={emailError} />
                                <InputComponent label='password' type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} onFocus={() => setPassError(false)}error={passError} />
                            </div>
                            <div className='signin__button__wrapper'>
                                <button
                                    type='submit'
                                    className='button__component'
                                    onClick={handleSubmit}
                                >
                                    login
                                </button>
                            </div>
                        </div>
                        <Link className='redirect__to__forgot__password' to={paths.Email} >forgot password?</Link>
                        <Link className='redirect__to__signup' to={paths.SignUp} >sign up</Link>
                    </div>
                </div>
            }
        </>
    )
}

export default NewLogin;