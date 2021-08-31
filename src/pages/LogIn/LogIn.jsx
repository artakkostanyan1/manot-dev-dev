import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Recaptcha from 'react-recaptcha';
import { Button, Link } from '@material-ui/core';
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
        <>
            <Header />
            <div className='button-container'>
                <Button onClick={() => history.push('/registration')}>
                    Sign Up
                </Button>
            </div>
            <div className='form_wrapper'>
                <form className='form' onSubmit={handleSubmit((data) => console.log(data))}>
                    <div className='heading'>Login</div>

                    <div className='email_div'>Email</div>
                    <input
                        className="email_input"
                        onChange={(e) => {
                            setEmail(e.target.value);
                            console.log('e', e.target.value)
                        }}
                        type='email'
                        value={email}
                        {...register("email", { required: 'Please enter your email' })} />
                    {errors.email && <div className='error_message'>{errors.email.message}</div>}

                    <div className='password_div'>Password</div>
                    <input
                        className="password_input"
                        type='password'
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
                        className='forggot-pasword'
                    >
                        Forgot password?
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
        </>
    )
}

export default LogIn;