import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';
import './Registration.scss';

function ProfileAndPassword(props) {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
    const history = useHistory();
    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();
    const [newPassword, setNewPassword] = useState();
    const [repeatPassword, setRepeatPassword] = useState();

    return (
        <>
            <Header />
            <div className='form_wrapper'>
                <form className='form' onSubmit={handleSubmit((data) => console.log(data))}>
                    <div className='heading'>Profile and password</div>

                    <div className='full_name_div'>Full name</div>
                    <input
                        className="full_name_input"
                        value={fullName}
                        onChange={(e) => { setFullName(e.target.value) }}
                        {...register("fullname", { required: 'Please enter your full name' })} />
                    {errors.fullname && <div className='error_message'>{errors.fullname.message}</div>}

                    <div className='email_div'>Email</div>
                    <input
                        className="email_input"
                        type='email'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        {...register("email", { required: 'Please enter your email' })} />
                    {errors.email && <div className='error_message'>{errors.email.message}</div>}

                    <div className='new_password_div'>New password</div>
                    <input
                        className="new_password_input"
                        type='password'
                        value={newPassword}
                        onChange={(e) => { setNewPassword(e.target.value) }}
                        {...register("newpassword", { required: 'Please enter password' })} />
                    {errors.newpassword && <div className='error_message'>{errors.newpassword.message}</div>}

                    <div className='repeat_password_div'>Repeat new password</div>
                    <input
                        className="repeat_password_input"
                        type='password'
                        value={repeatPassword}
                        onChange={(e) => { setRepeatPassword(e.target.value) }}
                        {...register("repeatpassword", { required: 'Please repeat password' })} />
                    {errors.repeatpassword && <div className='error_message'>{errors.repeatpassword.message}</div>}
                    <br />

                    <button
                        onClick={() =>
                            (fullName && email && newPassword && repeatPassword) &&
                            history.push('/verification')}
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