import React from 'react';
import Header from '../../components/Header/Header';
import { useForm } from "react-hook-form";
import './LogIn.scss';

function LogIn(props) {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
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

                    <button className='save_button' type='submit'>
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