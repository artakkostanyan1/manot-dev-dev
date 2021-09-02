import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Recaptcha from 'react-recaptcha';
import { Link } from '@material-ui/core';

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';

import './LogIn.scss';

function LogIn(props) {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [isVerified, setIsVerified] = useState(false);
    const [passwordType, setPasswordType] = useState('password');
    const history = useHistory();
    const preventDefault = (event) => {
        event.preventDefault();
        history.push('/registration')
    };

    function handleClick1() {
        (passwordType === 'password') ? setPasswordType('text') : setPasswordType('password');
    }

    function handleVerifyCallback(response) {
        if (response) {
            setIsVerified(true)
        }
    }

    return (
        <div className='verify_container'>
            <Header />

            <div className='form_wrapper'>
                <form className='form' onSubmit={handleSubmit((data) => { data && history.push('/') })}>
                    <div className='heading'>Sign in</div>

                    {/* <div className='email_div'>Email</div> */}
                    <input
                        type='email'
                        className="email_input"
                        placeholder='Email'
                        {...register("email", { required: 'Please enter your email' })} />
                    {errors.email && <div className='error_message'>{errors.email.message}</div>}

                    {/* <div className='password_div'>Password</div> */}
                    {/* <input
                        type='password'
                        className="password_input"
                        placeholder='Password'
                        {...register("password", { required: 'Please enter password' })} />
                    {errors.password && <div className='error_message'>{errors.password.message}</div>} */}
                    <div className='pass_wrapper'>
                        <input
                            type={passwordType}
                            className='new_password_input'
                            placeholder='Password'
                            {...register("password", { required: 'Please enter password' })}
                        />
                        <div className='pass_button' onClick={handleClick1}>
                            {(passwordType === 'text') ? <VisibilityOutlinedIcon style={{ fontSize: '22' }} />
                                : <VisibilityOffOutlinedIcon style={{ fontSize: '22' }} />
                            }
                        </div>
                    </div>
                    {errors.password && <div className='error_message'>{errors.newpassword.message}</div>}

                    <Recaptcha
                        className='login_recaptcha'
                        sitekey="6Lco1h8cAAAAAB0Si1bOomVmcyRqCK-OYKhy_7SW"
                        render="explicit"
                        verifyCallback={handleVerifyCallback}
                    />

                    <Link
                        href="#"
                        onClick={preventDefault}
                        className='forgot-password'
                    >
                        Forgot Password?
                    </Link>
                    <button
                        className='save_button'
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

export default LogIn;