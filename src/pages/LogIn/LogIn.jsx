import React from 'react';
import Header from '../../components/Header/Header';
import { useForm } from "react-hook-form";
import './LogIn.scss';

function LogIn(props) {

    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <>
            <Header />
            <form className='log-in-container'>
                <div className='h'>Log In</div>

                <div className='email_div'>Email</div>
                <input className="email_input"
                    {...register("email")} />

                <div className='password_div'>password</div>
                <input className="password_input"
                    {...register("password")} />

                <button className='submit_button' type='submit'>
                    <div className='submit_text'>
                        Log In
                    </div>
                </button>
            </form>
        </>
    )
}

export default LogIn;