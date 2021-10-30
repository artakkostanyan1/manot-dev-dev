import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { useHistory } from 'react-router';

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';

import paths from '../../utils/routing';
import './ResetPassword.scss';

require('dotenv').config();

function ResetPassword(props) {
    const history = useHistory();
    const [passwordType, setPasswordType] = useState('password');
    const [repeatPasswordType, setRepeatPasswordType] = useState('password');
    const [pass1, setPass1] = useState();
    const [pass2, setPass2] = useState();
    const [isMatched, setIsMatched] = useState(true);
    const [error, setError] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;
    // TO DO: /////////////////////////////////////////////////////resserpassword api path

    const resetPassword = (data) => {
        console.log('data', data);
        fetch(`${apiUrl}resetPassword`, {
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
                    history.push(paths.Login);
                }
                console.log('res', response)
                return response.json();
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    function handleClick1() {
        (passwordType === 'password') ? setPasswordType('password') : setPasswordType('text');
    }

    function handleClick2() {
        (repeatPasswordType === 'password') ? setRepeatPasswordType('password') : setRepeatPasswordType('text');
    }

    function handleSubmit(event) {
        event.preventDefault();

        const data = {
            pass1,
            pass2,
        }

        pass1 !== pass2 ? setIsMatched(false) : setIsMatched(true);
        (pass1 === pass2) && Object.keys(data).length && resetPassword(data);
    }

    return (
        <div className='registration_container'>
            <Header />
            <div className='form_wrapper'>
                {error && <div>{error}</div>}
                <form className='form' onSubmit={handleSubmit}>
                    <div className='heading'>Reset Password</div>
                    {/* <input
                        type='email'
                        className="email_input"
                        placeholder='Email'
                        {...register("email", { required: 'Please enter your email' })}
                    />
                    {errors.email && <div className='error_message'>{errors.email.message}</div>} */}

                    <div className='pass_wrapper'>
                        <input
                            type={passwordType}
                            className='new_password_input'
                            placeholder='Password'
                            value={pass1}
                            onChange={(e) => setPass1(e.target.value)}
                        />
                        <button className='pass_button' onClick={handleClick1}>
                            {(passwordType === 'text') ? <VisibilityOutlinedIcon style={{ fontSize: '22', color: 'grey' }} />
                                : <VisibilityOffOutlinedIcon style={{ fontSize: '22', color: 'grey' }} />
                            }
                        </button>
                    </div>

                    <div className='pass_wrapper'>
                        <input
                            type={repeatPasswordType}
                            className='new_password_input'
                            placeholder='Repeat password'
                            value={pass2}
                            onChange={(e) => { setPass2(e.target.value) }}
                        />
                        <button className='pass_button' onClick={handleClick2}>
                            {(repeatPasswordType === 'text') ? <VisibilityOutlinedIcon style={{ fontSize: '22', color: 'grey' }} />
                                : <VisibilityOffOutlinedIcon style={{ fontSize: '22', color: 'grey' }} />
                            }
                        </button>
                    </div>
                    {!isMatched && <div className='error_message'>Passwords don't match</div>}
                    <button
                        className='submit_button'
                        type='submit'
                    >
                        <div className='submit_text'>
                            Submit
                        </div>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword;