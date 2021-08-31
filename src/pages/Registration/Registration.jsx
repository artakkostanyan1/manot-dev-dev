import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { useForm } from "react-hook-form";
// import { useHistory } from 'react-router';

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';

import './Registration.scss';

function ProfileAndPassword(props) {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [passwordType, setPasswordType] = useState('text');
    const [repeatPasswordType, setRepeatPasswordType] = useState('text');
    // const history = useHistory();
    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();
    const [newPassword, setNewPassword] = useState();
    const [repeatPassword, setRepeatPassword] = useState();

    function handleClick1() {
        (passwordType === 'password') ? setPasswordType('password') : setPasswordType('text');
    }

    function handleClick2() {
        (repeatPasswordType === 'password') ? setRepeatPasswordType('password') : setRepeatPasswordType('text');
    }
    // const onSubmit = data => console.log(data);

    return (
        <>
            <Header />
            <div className='form_wrapper'>
                <form className='form' onSubmit={handleSubmit((data) => console.log(data))}>
                    <div className='heading'>Sign up</div>

                    {/* <div className='name_div'>Name</div> */}
                    <input className="name_input"
                        {...register("name", { required: 'Please enter your name' })}
                        placeholder='Name' />
                    {errors.name && <div className='error_message'>{errors.name.message}</div>}

                    {/* <div className='surname_div'>Surname</div> */}
                    <input className="surname_input"
                        {...register("surname", { required: 'Please enter your full name' })}
                        placeholder='Surname' />
                    {errors.surname && <div className='error_message'>{errors.surname.message}</div>}

                    {/* <div className='email_div'>Email</div> */}
                    <input className="email_input"
                        type='email'
                        {...register("email", { required: 'Please enter your email' })}
                        placeholder='Email' />
                    {errors.email && <div className='error_message'>{errors.email.message}</div>}

                    <br />
                    <div className='pass_wrapper'>
                        <input type={passwordType} className='new_password_input'
                            {...register("newpassword", { required: 'Please enter password' })}
                            placeholder='Password'
                        />
                        <button className='pass_button' onClick={handleClick1}>
                            {(passwordType === 'text') ? <VisibilityOutlinedIcon style={{ fontSize: '22' }} />
                                : <VisibilityOffOutlinedIcon style={{ fontSize: '22' }} />
                            }
                        </button>
                    </div>
                    {errors.newpassword && <div className='error_message'>{errors.newpassword.message}</div>}

                    <div className='pass_wrapper'>
                        <input type={repeatPasswordType} className='new_password_input'
                            {...register("newpassword", { required: 'Please enter password' })}
                            placeholder='Repeat password'
                        />
                        <button className='pass_button' onClick={handleClick2}>
                            {(repeatPasswordType === 'text') ? <VisibilityOutlinedIcon style={{ fontSize: '22' }} />
                                : <VisibilityOffOutlinedIcon style={{ fontSize: '22' }} />
                            }
                        </button>
                    </div>
                    {errors.newpassword && <div className='error_message'>{errors.newpassword.message}</div>}

                    <button
                        // onClick={() => history.push('/verification')}
                        className='submit_button'
                        type='submit'
                    >
                        <div className='submit_text'>
                            Sign up
                        </div>
                    </button>

                </form>
            </div>
        </>
    )
}

export default ProfileAndPassword;