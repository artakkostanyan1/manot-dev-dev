import React from 'react';
import Header from '../../components/Header/Header';
import { useForm } from "react-hook-form";
import './ProfileAndPassword.scss';

function ProfileAndPassword(props) {

    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <>
            <Header />
            <form >
                <div className='h'>Profile and password</div>

                <div className='full_name_div'>Full name</div>
                <input className="full_name_input"
                    {...register("fullname", { required: true })} />

                <div className='email_div'>Email</div>
                <input className="email_input"
                    {...register("email")} />

                <div className='new_password_div'>New password</div>
                <input className="new_password_input"
                    {...register("newpassword")} />

                <div className='repeat_password_div'>Repeat new password</div>
                <input className="repeat_password_input"
                    {...register("repeatpassword")} />

                <button className='submit_button' type='submit'>
                    <div className='submit_text'>
                        Save changes
                    </div>
                </button>
            </form>
        </>
    )
}

export default ProfileAndPassword;