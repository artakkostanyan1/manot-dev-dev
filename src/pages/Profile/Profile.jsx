import React, { useEffect, useState } from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import { useHistory } from 'react-router';

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';

import paths from '../../utils/routing';
import './Profile.scss';

function Profile(props) {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [old_password, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmed_pass, setConfirmedPassword] = useState('');

    const [error, setError] = useState('');
    const [nameError, setNameError] = useState('');
    const [surnameError, setSurnameError] = useState('');
    const [old_passwordError, setOldPasswordError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmed_passError, setConfirmed_passError] = useState('');

    const [oldPasswordType, setOldPasswordType] = useState('password');
    const [passwordType, setPasswordType] = useState('password');
    const [repeatPasswordType, setRepeatPasswordType] = useState('password');
    const history = useHistory();

    function validate() {
        if (name === '') { setNameError('Please enter your name') }
        if (surname === '') { setSurnameError('Please enter your surname') }
        if (old_password === '') { setOldPasswordError('Please enter your old password') }
        if (password === '') { setPasswordError('Please enter your password') }
        if (confirmed_pass === '') { setConfirmed_passError('Please enter password') }
    }

    function handleClick0() {
        (oldPasswordType === 'password') ? setOldPasswordType('text') : setOldPasswordType('password');
    }

    function handleClick1() {
        (passwordType === 'password') ? setPasswordType('text') : setPasswordType('password');
    }

    function handleClick2() {
        (repeatPasswordType === 'password') ? setRepeatPasswordType('text') : setRepeatPasswordType('password');
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

        // Object.keys(data).length && history.push(paths.Importdata);
    }

    useEffect(() => {
        fetch('http://localhost:5000/api/v1/get_user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    setError(response.statusText);
                } else {
                    console.log('res =======', response);
                }
                console.log('res', response)
                return response.json();
            })
            .catch((error) => {
                setError(error.message);
            });
    })

    return (
        <div className='registration_container'>
            <UserHeader />
            <div className='form_wrapper'>
                <form className='form' onSubmit={handleSubmit}>
                    <div className='heading'>Profile and password</div>

                    <input
                        type='text'
                        className="name_input"
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {nameError && <div className='error_message'>{nameError}</div>}

                    <input
                        type='text'
                        className="surname_input"
                        placeholder='Surname'
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                    {surnameError && <div className='error_message'>{surnameError}</div>}

                    <input
                        type='email'
                        className="email_input"
                        placeholder='Email'
                        value='mays@gmail.com'
                        disabled
                    />

                    <br />
                    <div className='pass_wrapper'>
                        <input
                            type={oldPasswordType}
                            className='new_password_input'
                            placeholder='Old Password'
                            value={old_password}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <div className='pass_button' onClick={handleClick0}>
                            {(oldPasswordType === 'text') ? <VisibilityOutlinedIcon style={{ fontSize: '22', color: 'grey' }} />
                                : <VisibilityOffOutlinedIcon style={{ fontSize: '22', color: 'grey' }} />
                            }
                        </div>
                    </div>
                    {old_passwordError && <div className='error_message'>{old_passwordError}</div>}

                    <div className='pass_wrapper'>
                        <input
                            type={passwordType}
                            className='new_password_input'
                            placeholder='New Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className='pass_button' onClick={handleClick1}>
                            {(passwordType === 'text') ? <VisibilityOutlinedIcon style={{ fontSize: '22', color: 'grey' }} />
                                : <VisibilityOffOutlinedIcon style={{ fontSize: '22', color: 'grey' }} />
                            }
                        </div>
                    </div>
                    {passwordError && <div className='error_message'>{passwordError}</div>}

                    <div className='pass_wrapper'>
                        <input
                            type={repeatPasswordType}
                            className='new_password_input'
                            placeholder='Repeat New Password'
                            value={confirmed_pass}
                            onChange={(e) => setConfirmedPassword(e.target.value)}
                        />
                        <div className='pass_button' onClick={handleClick2}>
                            {(repeatPasswordType === 'text') ? <VisibilityOutlinedIcon style={{ fontSize: '22', color: 'grey' }} />
                                : <VisibilityOffOutlinedIcon style={{ fontSize: '22', color: 'grey' }} />
                            }
                        </div>
                    </div>
                    {confirmed_passError && <div className='error_message'>{confirmed_passError}</div>}

                    <button
                        className='submit_button'
                        type='submit'
                    >
                        <div className='submit_text'>
                            Save changes
                        </div>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Profile;