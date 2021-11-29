import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import UserHeader, { CustomMenu } from '../components/UserHeader/UserHeader';
import Loader from '../components/Loader/Loader';
import TextField from '@mui/material/TextField';

import paths from '../utils/routing';

import './NewProfile.scss';

require('dotenv').config();

function Profile(props) {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [old_password, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmed_pass, setConfirmedPassword] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [nameError, setNameError] = useState('');
    const [surnameError, setSurnameError] = useState('');
    const [old_passwordError, setOldPasswordError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmed_passError, setConfirmed_passError] = useState('');
    const [toggleMenu, setToggleMenu] = useState(false);

    const history = useHistory();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch(`${apiUrl}get-user`, {
            method: 'GET',
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setIsLoading(false)
                if (data.status === 'fail' && data.message === 'Token is invalid') {
                    localStorage.removeItem('token');
                    history.push(paths.Main)
                }
                setName(data.message.name);
                setSurname(data.message.surname);
                setEmail(data.message.email);
            })
    }, [])

    const sendUserNewData = (data) => {
        fetch(`${apiUrl}edit-profile`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                "x-access-token": localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log('data', data)
            })
            .catch((err) => console.log('err', err))
        history.push(paths.Importdata)
    }

    function validateNameAndSurname() {
        name === '' ? setNameError(true) : setNameError(false);
        surname === '' ? setSurnameError(true) : setSurnameError(false);
    }

    function isMissingField() {
        if (nameError || surnameError || passwordError || confirmed_passError || old_passwordError) {
            return false;
        } else {
            return true;
        }
    }

    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})");

    function handleSubmit(event) {
        event.preventDefault();
        let data;

        validateNameAndSurname();

        if (name !== '' && surname !== '' && email !== '') {
            if (old_password === '' && confirmed_pass === '' && password === '') {
                data = {
                    name,
                    surname,
                    email,
                }
                isMissingField() && sendUserNewData(data)
            }
            if (old_password !== '' || confirmed_pass !== '' || password !== '') {
                old_password === '' ? setOldPasswordError(true) : setOldPasswordError(false);
                (password === '' || password !== confirmed_pass) ? setPasswordError(true) : setPasswordError(false);
                (confirmed_pass === '' || password !== confirmed_pass) ? setConfirmed_passError(true) : setConfirmed_passError(false);

                data = {
                    name,
                    surname,
                    email,
                    old_password,
                    password,
                    confirmed_pass,
                }

                isMissingField() && (password === confirmed_pass) && strongRegex.test(password) && sendUserNewData(data)
            }
        }
    }

    const showMenu = toggleMenu ? 'show__menu' : 'hide__menu'

    const handleToggle = (data) => {
        setToggleMenu(data)
    }

    return (
        <>
            {isLoading ? <Loader /> : <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                <div className={`profile_container ${showMenu}`}>
                    <UserHeader handleToggle={handleToggle} showBurger={toggleMenu} />
                    <div className='profile__wrapper'>
                        <div className='profile__heading'>profile and password</div>
                        <TextField label='first name' variant="outlined" size="small" color="secondary"
                            value={name} onChange={(e) => setName(e.target.value)}
                            error={nameError} style={{
                                width: '450px',
                                margin: '9px'
                            }} />
                        <TextField label='last name' variant="outlined" size="small" color="secondary"
                            value={surname} onChange={(e) => setSurname(e.target.value)}
                            error={surnameError} style={{
                                width: '450px',
                                margin: '9px'
                            }} />
                        <TextField label='email' variant="outlined" size="small" color="secondary" disabled
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '450px',
                                margin: '9px'
                            }} />
                        <TextField label='current password' variant="outlined" size="small" color="secondary" type="password"
                            value={old_password} onChange={(e) => setOldPassword(e.target.value)}
                            error={old_passwordError} style={{
                                width: '450px',
                                margin: '9px'
                            }} />
                        <TextField label='new password' variant="outlined" size="small" color="secondary" type="password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            error={passwordError} style={{
                                width: '450px',
                                margin: '9px'
                            }} />
                        {!strongRegex.test(password) && password !== '' &&
                            <div className='error__message' style={{ width: '440px' }}>Password must contain at least 6 characters, including upper + lowercase, numbers and special symbols[!@#$%^&*]</div>}

                        <TextField label='repeat password' variant="outlined" size="small" color="secondary" type="password"
                            value={confirmed_pass} onChange={(e) => setConfirmedPassword(e.target.value)}
                            error={confirmed_passError} style={{
                                width: '450px',
                                margin: '9px'
                            }} />

                        <div className='save__button__wrapper'>
                            <button
                                type='submit'
                                className='button__component'
                                onClick={handleSubmit}
                            >
                                save
                            </button>
                        </div>
                        <div className='cancel__button' onClick={() => history.go(-1)}>
                            cancel
                        </div>
                    </div>
                </div>
                {toggleMenu && <CustomMenu handleToggle={handleToggle} />}
            </div>
            }
        </>

    )
}

export default Profile;