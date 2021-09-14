import React, { useState } from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';

import './Profile.scss';

function Profile(props) {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [oldPasswordType, setOldPasswordType] = useState('password');
    const [passwordType, setPasswordType] = useState('password');
    const [repeatPasswordType, setRepeatPasswordType] = useState('password');
    const history = useHistory();

    function handleClick0() {
        (oldPasswordType === 'password') ? setOldPasswordType('text') : setOldPasswordType('password');
    }

    function handleClick1() {
        (passwordType === 'password') ? setPasswordType('text') : setPasswordType('password');
    }

    function handleClick2() {
        (repeatPasswordType === 'password') ? setRepeatPasswordType('text') : setRepeatPasswordType('password');
    }

    return (
        <div className='registration_container'>
            <UserHeader />
            <div className='form_wrapper'>
                <form className='form' onSubmit={handleSubmit((data) => data && history.push('/verification'))}>
                    <div className='heading'>Profile and password</div>

                    {/* <div className='name_div'>Name</div> */}
                    <input
                        type='text'
                        className="name_input"
                        placeholder='Name'
                        value='User name'
                        {...register("name", { required: 'Please enter your name' })}
                    />
                    {errors.name && <div className='error_message'>{errors.name.message}</div>}

                    {/* <div className='surname_div'>Surname</div> */}
                    <input
                        type='text'
                        className="surname_input"
                        placeholder='Surname'
                        value='User surname'
                        {...register("surname", { required: 'Please enter your full name' })}
                    />
                    {errors.surname && <div className='error_message'>{errors.surname.message}</div>}

                    {/* <div className='email_div'>Email</div> */}
                    <input
                        type='email'
                        className="email_input"
                        placeholder='Email'
                        value='mays@gmail.com'
                        disabled
                        {...register("email", { required: 'Please enter your email' })}
                    />
                    {errors.email && <div className='error_message'>{errors.email.message}</div>}

                    <br />
                    <div className='pass_wrapper'>
                        <input
                            type={oldPasswordType}
                            className='new_password_input'
                            placeholder='Old Password'
                            {...register("password", { required: 'Please enter password' })}
                        />
                        <div className='pass_button' onClick={handleClick0}>
                            {(oldPasswordType === 'text') ? <VisibilityOutlinedIcon style={{ fontSize: '22' }} />
                                : <VisibilityOffOutlinedIcon style={{ fontSize: '22' }} />
                            }
                        </div>
                    </div>
                    {errors.password && <div className='error_message'>{errors.newpassword.message}</div>}

                    <div className='pass_wrapper'>
                        <input
                            type={passwordType}
                            className='new_password_input'
                            placeholder='New Password'
                            {...register("password", { required: 'Please enter password' })}
                        />
                        <div className='pass_button' onClick={handleClick1}>
                            {(passwordType === 'text') ? <VisibilityOutlinedIcon style={{ fontSize: '22' }} />
                                : <VisibilityOffOutlinedIcon style={{ fontSize: '22' }} />
                            }
                        </div>
                    </div>
                    {errors.password && <div className='error_message'>{errors.newpassword.message}</div>}

                    <div className='pass_wrapper'>
                        <input
                            type={repeatPasswordType}
                            className='new_password_input'
                            placeholder='Repeat New Password'
                            {...register("repeatpassword", { required: 'Please enter password' })}
                        />
                        <div className='pass_button' onClick={handleClick2}>
                            {(repeatPasswordType === 'text') ? <VisibilityOutlinedIcon style={{ fontSize: '22' }} />
                                : <VisibilityOffOutlinedIcon style={{ fontSize: '22' }} />
                            }
                        </div>
                    </div>
                    {errors.repeatpassword && <div className='error_message'>{errors.newpassword.message}</div>}

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