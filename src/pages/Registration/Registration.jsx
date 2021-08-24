import React from 'react';
import Header from '../../components/Header/Header';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';
import './Registration.scss';

function ProfileAndPassword(props) {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const history = useHistory();
    
    const onSubmit = data => console.log(data);

    return (
        <>
            <Header />
            <div className='form_wrapper'>
                <form className='form' onSubmit={handleSubmit((data) => console.log(data))}>
                    <div className='heading'>Profile and password</div>

                    <div className='full_name_div'>Full name</div>
                    <input className="full_name_input"
                        {...register("fullname", { required: 'Please enter your full name' })} />
                    {errors.fullname && <div className='error_message'>{errors.fullname.message}</div>}

                    <div className='email_div'>Email</div>
                    <input className="email_input"
                        type='email'
                        {...register("email", { required: 'Please enter your email' })} />
                    {errors.email && <div className='error_message'>{errors.email.message}</div>}

                    <div className='new_password_div'>New password</div>
                    <input className="new_password_input"
                        {...register("newpassword", { required: 'Please enter password' })} />
                    {errors.newpassword && <div className='error_message'>{errors.newpassword.message}</div>}

                    <div className='repeat_password_div'>Repeat new password</div>
                    <input className="repeat_password_input"
                        {...register("repeatpassword", { required: 'Please repeat password' })} />
                    {errors.repeatpassword && <div className='error_message'>{errors.repeatpassword.message}</div>}
                    <br />

                    <button
                        onClick={() => history.push('/verification')}
                        className='submit_button'
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

export default ProfileAndPassword;