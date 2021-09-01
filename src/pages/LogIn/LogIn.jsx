import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Recaptcha from 'react-recaptcha';
import { Link } from '@material-ui/core';
import './LogIn.scss';

function LogIn(props) {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [isVerified, setIsVerified] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();
    const preventDefault = (event) => {
        event.preventDefault();
        history.push('/registration')
    };
    // const onSubmit = data => console.log(data);

    function handleVerifyCallback(response) {
        if (response) {
            setIsVerified(true)
        }
    }

    return (
        <div className='verify_container'>
            <Header />

            <div className='form_wrapper'>
                <form className='form' onSubmit={handleSubmit((data) => console.log(data))}>
                    <div className='heading'>Sign in</div>

                    {/* <div className='email_div'>Email</div> */}
                    <input
                        type='email'
                        className="email_input"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            console.log('e', e.target.value)
                        }}
                        {...register("email", { required: 'Please enter your email' })} />
                    {errors.email && <div className='error_message'>{errors.email.message}</div>}

                    {/* <div className='password_div'>Password</div> */}
                    <input
                        type='password'
                        className="password_input"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        {...register("password", { required: 'Please enter password' })} />
                    {errors.password && <div className='error_message'>{errors.password.message}</div>}

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
                        onClick={() => {
                            (email && password) &&
                                history.push('/')
                        }
                        }
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