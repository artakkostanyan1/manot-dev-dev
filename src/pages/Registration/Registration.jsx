import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';
import Recaptcha from 'react-recaptcha';

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';

import paths from '../../utils/routing';
import './Registration.scss';

function Registration(props) {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [passwordType, setPasswordType] = useState('password');
    const [pass1, setPass1] = useState();
    const [pass2, setPass2] = useState();
    const [repeatPasswordType, setRepeatPasswordType] = useState('password');
    const [isVerified, setIsVerified] = useState(false);
    const [accept, setAccept] = useState(false);
    const [isMatched, setIsMatched] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const history = useHistory();

    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    function handleClick1() {
        (passwordType === 'password') ? setPasswordType('text') : setPasswordType('password');
    }

    function handleClick2() {
        (repeatPasswordType === 'password') ? setRepeatPasswordType('text') : setRepeatPasswordType('password');
    }

    const handleAccept = () => {
        setAccept(!accept);
    }

    function handleVerifyCallback(response) {
        if (response) {
            setIsVerified(true)
        }
    }

    return (
        <div >
            <Header />
            <div className='form_wrapper'>
                <form className='form' onSubmit={
                    handleSubmit((data) => {
                        pass1 !== pass2 ? setIsMatched(false) : setIsMatched(true);
                        if (isMatched) {
                            !(strongRegex.test(pass1) && strongRegex.test(pass2)) && setIsValidPassword(false)
                        }

                        ((pass1 === pass2) && accept && strongRegex.test(pass1) && Object.keys(data).length) && history.push(paths.Verify)
                    })
                }>
                    <div className='heading'>Sign up</div>

                    <input
                        type='text'
                        className="name_input"
                        placeholder='Name'
                        {...register("name", { required: 'Please enter your name' })}
                    />
                    {errors.name && <div className='error_message'>{errors.name.message}</div>}

                    <input
                        type='text'
                        className="surname_input"
                        placeholder='Surname'
                        {...register("surname", { required: 'Please enter your full name' })}
                    />
                    {errors.surname && <div className='error_message'>{errors.surname.message}</div>}

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
                            value={pass1}
                            {...register("password", { required: 'Please enter password' })}
                            onChange={(e) => { setPass1(e.target.value) }}
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
                            placeholder='Repeat password'
                            value={pass2}
                            {...register("newpassword", { required: 'Please enter password' })}
                            onChange={(e) => { setPass2(e.target.value) }}
                        />
                        <div className='pass_button' onClick={handleClick2}>
                            {(repeatPasswordType === 'text') ? <VisibilityOutlinedIcon style={{ fontSize: '22' }} />
                                : <VisibilityOffOutlinedIcon style={{ fontSize: '22' }} />
                            }
                        </div>
                    </div>
                    {errors.newpassword && <div className='error_message'>{errors.newpassword.message}</div>}
                    {!isMatched && <div className='error_message'>Passwords don't match</div>}
                    {isMatched && !isValidPassword && <div className='error_message'>Password format is not valid</div>}

                    <div className='accept-policy-container'>
                        <div>
                            <input
                                className='policy-checkbox'
                                type='checkbox'
                                onClick={handleAccept}
                                {...register("checkbox", { required: 'Please check' })}
                            />
                            <div className='policy-container'>
                                Accept our
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
                                    Privacy Policy
                                </b>
                            </div>
                        </div>
                        {errors.checkbox && <div className='error_message'>{errors.checkbox.message}</div>}
                    </div>

                    <Recaptcha
                        className='login_recaptcha'
                        sitekey="6Lco1h8cAAAAAB0Si1bOomVmcyRqCK-OYKhy_7SW"
                        render="explicit"
                        verifyCallback={handleVerifyCallback}
                    />

                    <button
                        className='submit_button'
                        type='submit'
                    >
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Registration;