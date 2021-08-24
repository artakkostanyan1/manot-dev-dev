import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Recaptcha from 'react-recaptcha';
import './LogIn.scss';

function LogIn(props) {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const history = useHistory();
    const [isVerified, setIsVerified] = useState(false);

    const onSubmit = data => console.log(data);

    function handleVerifyCallback(response) {
        if (response) {
            setIsVerified(true)
        }
    }

    return (
        <>
            <Header />
            <div className='form_wrapper'>
                <form className='form' onSubmit={handleSubmit((data) => console.log(data))}>
                    <div className='heading'>Login</div>

                    <div className='email_div'>Email</div>
                    <input className="email_input"
                        type='email'
                        {...register("email", { required: 'Please enter your email' })} />
                    {errors.email && <div className='error_message'>{errors.email.message}</div>}

                    <div className='password_div'>Password</div>
                    <input className="password_input"
                        {...register("password", { required: 'Please enter password' })} />
                    {errors.password && <div className='error_message'>{errors.password.message}</div>}

                    <Recaptcha
                        className='login_recaptcha'
                        sitekey="6Lco1h8cAAAAAB0Si1bOomVmcyRqCK-OYKhy_7SW"
                        render="explicit"
                        verifyCallback={handleVerifyCallback}
                    />

                    <button
                        onClick={() => history.push('/')}
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