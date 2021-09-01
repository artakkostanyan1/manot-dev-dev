import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';

import './ResetPassword.scss';

function ResetPassword(props) {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const history = useHistory();
    const [passwordType, setPasswordType] = useState('password');
    const [repeatPasswordType, setRepeatPasswordType] = useState('password');

    function handleClick1() {
        (passwordType === 'password') ? setPasswordType('password') : setPasswordType('text');
    }

    function handleClick2() {
        (repeatPasswordType === 'password') ? setRepeatPasswordType('password') : setRepeatPasswordType('text');
    }

    return (
        <>
            <Header />
            <div className='form_wrapper'>
                <form className='form' onSubmit={handleSubmit((data) => data && history.push('/login'))}>
                    <div className='heading'>Reset Password</div>
                    <input
                        type='email'
                        className="email_input"
                        placeholder='Email'
                        {...register("email", { required: 'Please enter your email' })}
                    />
                    {errors.email && <div className='error_message'>{errors.email.message}</div>}

                    <br />
                    <div className='pass_wrapper'>
                        <input
                            type={passwordType}
                            className='new_password_input'
                            placeholder='Password'
                            {...register("password", { required: 'Please enter password' })}
                        />
                        <button className='pass_button' onClick={handleClick1}>
                            {(passwordType === 'text') ? <VisibilityOutlinedIcon style={{ fontSize: '22' }} />
                                : <VisibilityOffOutlinedIcon style={{ fontSize: '22' }} />
                            }
                        </button>
                    </div>
                    {errors.password && <div className='error_message'>{errors.newpassword.message}</div>}

                    <div className='pass_wrapper'>
                        <input
                            type={repeatPasswordType}
                            className='new_password_input'
                            placeholder='Repeat password'
                            {...register("newpassword", { required: 'Please enter password' })}
                        />
                        <button className='pass_button' onClick={handleClick2}>
                            {(repeatPasswordType === 'text') ? <VisibilityOutlinedIcon style={{ fontSize: '22' }} />
                                : <VisibilityOffOutlinedIcon style={{ fontSize: '22' }} />
                            }
                        </button>
                    </div>
                    {errors.newpassword && <div className='error_message'>{errors.newpassword.message}</div>}

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
        </>
    )
}

export default ResetPassword;