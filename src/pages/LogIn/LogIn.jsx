import React from 'react';
import Header from '../../components/Header/Header';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Button, Link } from '@material-ui/core';
import './LogIn.scss';
import { useState } from 'react';

function LogIn(props) {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();
    const preventDefault = (event) => {
        event.preventDefault();
        history.push('/registration')
    };

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
                        type='email'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
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