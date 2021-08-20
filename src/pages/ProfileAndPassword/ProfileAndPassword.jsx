import React from 'react';
import Header from '../../components/Header/Header';
import { useForm } from "react-hook-form";
import { withTranslation } from 'react-i18next';
import './ProfileAndPassword.scss';

function ProfileAndPassword(props) {

    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <>
            <Header />
            <form >
                <div className='h'>{props.t('user_profile')}</div>

                <div className='full_name_div'>{props.t('full_name')}</div>
                <input className="full_name_input"
                    {...register("fullname", { required: true })} />

                <div className='email_div'>{props.t('email')}</div>
                <input className="email_input"
                    {...register("email")} />

                <div className='new_password_div'>{props.t('new_psswd')}</div>
                <input className="new_password_input"
                    {...register("newpassword")} />

                <div className='repeat_password_div'>{props.t('repeat_psswd')}</div>
                <input className="repeat_password_input"
                    {...register("repeatpassword")} />

                <button className='submit_button' type='submit'>
                    <div className='submit_text'>
                        {props.t('save_button')}
                    </div>
                </button>
            </form>
        </>
    )
}

export default withTranslation()(ProfileAndPassword);