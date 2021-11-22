import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import UserHeader from '../components/UserHeader/UserHeader';
import Loader from '../components/Loader/Loader';
import TextField from '@mui/material/TextField';

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import InputComponent from '../components/InputComponent/InputComponent';
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
    const [emailError, setEmailError] = useState('');
    const [surnameError, setSurnameError] = useState('');
    const [old_passwordError, setOldPasswordError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmed_passError, setConfirmed_passError] = useState('');

    const [oldPasswordType, setOldPasswordType] = useState('password');
    const [passwordType, setPasswordType] = useState('password');
    const [repeatPasswordType, setRepeatPasswordType] = useState('password');

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

    function validate() {
        if (name === '') { setNameError('Please enter your name') }
        if (surname === '') { setSurnameError('Please enter your surname') }
        if (old_password === '') { setOldPasswordError('Please enter your old password') }
        if (password === '') { setPasswordError('Please enter your password') }
        if (confirmed_pass === '') { setConfirmed_passError('Please enter password') }
    }


    function handleSubmit(event) {
        event.preventDefault();

        const data = {
            name,
            surname,
            email,
            old_password,
            password,
            confirmed_pass,
        }

        validate();

        //  history.push(paths.Importdata);
    }

    return (<>
        {isLoading ? <Loader /> : <div className='profile_container'>
            <UserHeader />
            <div className='profile__wrapper'>
                <div className='profile__heading'>Profile and password</div>
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
                <TextField label='email' variant="outlined" size="small" color="secondary"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    error={emailError} style={{
                        width: '450px',
                        margin: '9px'
                    }} />
                <TextField label='current password' variant="outlined" size="small" color="secondary"
                    value={old_password} onChange={(e) => setOldPassword(e.target.value)}
                    error={old_passwordError} style={{
                        width: '450px',
                        margin: '9px'
                    }} />
                <TextField label='new password' variant="outlined" size="small" color="secondary"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    error={passwordError} style={{
                        width: '450px',
                        margin: '9px'
                    }} />
                <TextField label='repeat password' variant="outlined" size="small" color="secondary"
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
                <div className='cancel__button' onClick={() => console.log('cancel')}>
                    cancel
                </div>
            </div>
        </div>}
    </>
    )
}

export default Profile;