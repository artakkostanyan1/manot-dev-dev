import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import UserHeader, { CustomMenu } from '../../components/UserHeader/UserHeader';
import TextField from '@mui/material/TextField';

import paths from '../../utils/routing';

import './ContactUs.scss';

require('dotenv').config();

function ContactUs(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [message, setMessage] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumbeError, setPhoneNumberError] = useState('');
    const [companyNameError, setCompanyNameError] = useState('');
    const [messageError, setMessageError] = useState('');

    const [toggleMenu, setToggleMenu] = useState(false);
    const history = useHistory();
    const apiUrl = process.env.REACT_APP_API_URL;

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validateData() {
        name === '' ? setNameError(true) : setNameError(false);
        (email === '' || !validateEmail(email)) ? setEmailError(true) : setEmailError(false);
        phoneNumber === '' ? setPhoneNumberError(true) : setPhoneNumberError(false);
        companyName === '' ? setCompanyNameError(true) : setCompanyNameError(false);
        message === '' ? setMessageError(true) : setMessageError(false);
    }


    function handleSubmit(event) {
        event.preventDefault();
        let data;

        data = {
            name,
            email,
            phoneNumber,
            companyName,
            message,
        }

        validateData() && history.push(paths.DashBoard);
    }

    const showMenu = toggleMenu ? 'show__menu' : 'hide__menu'

    const handleToggle = (data) => {
        setToggleMenu(data)
    }

    return (
        <>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                <div className={`contactUs_container ${showMenu}`}>
                    <UserHeader handleToggle={handleToggle} showBurger={toggleMenu} />
                    <div className='contactUs__wrapper'>
                        <div className='contactUs__heading'>contact us</div>
                        <TextField
                            label='first name'
                            variant="outlined"
                            size="small"
                            color="secondary"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onFocus={() => setNameError(false)}
                            error={nameError} style={{
                                width: '450px',
                                margin: '9px'
                            }} />
                        <TextField
                            label='email'
                            variant="outlined"
                            size="small"
                            color="secondary"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setEmailError(false)}
                            error={emailError}
                            style={{
                                width: '450px',
                                margin: '9px'
                            }} />
                        <TextField
                            label='phone number'
                            variant="outlined"
                            size="small"
                            color="secondary"
                            type="number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            onFocus={() => setPhoneNumberError(false)}
                            error={phoneNumbeError}
                            style={{
                                width: '450px',
                                margin: '9px'
                            }} />
                        <TextField
                            label='company name'
                            variant="outlined"
                            size="small"
                            color="secondary"
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            onFocus={() => setCompanyNameError(false)}
                            error={companyNameError}
                            style={{
                                width: '450px',
                                margin: '9px'
                            }} />
                        <TextField
                            label='message'
                            variant="outlined"
                            size="small"
                            multiline
                            rows={7}
                            color="secondary"
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onFocus={() => setMessageError(false)}
                            error={messageError}
                            style={{
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
        </>

    )
}

export default ContactUs;