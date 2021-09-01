import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';

import './Registration.scss';

function ProfileAndPassword(props) {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [passwordType, setPasswordType] = useState('password');
    const [repeatPasswordType, setRepeatPasswordType] = useState('password');
    const history = useHistory();

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
                <form className='form' onSubmit={handleSubmit((data) => data && history.push('/verification'))}>
                    <div className='heading'>Sign up</div>

                    {/* <div className='name_div'>Name</div> */}
                    <input
                        type='text'
                        className="name_input"
                        placeholder='Name'
                        {...register("name", { required: 'Please enter your name' })}
                    />
                    {errors.name && <div className='error_message'>{errors.name.message}</div>}

                    {/* <div className='surname_div'>Surname</div> */}
                    <input
                        type='text'
                        className="surname_input"
                        placeholder='Surname'
                        {...register("surname", { required: 'Please enter your full name' })}
                    />
                    {errors.surname && <div className='error_message'>{errors.surname.message}</div>}

                    {/* <div className='email_div'>Email</div> */}
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
                            Sign up
                        </div>
                    </button>
                    <div className='policy-container'>
                        By signing up you accept our <br />
                        <b
                            onClick={() => alert('The Terms of Use page')}
                            className='terms'
                        >
                            Terms of Use
                        </b>
                        and
                        <b
                            onClick={() => alert('The Privace Policy poage')}
                            className='policy'
                        >
                            Privace Policy
                        </b>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ProfileAndPassword;