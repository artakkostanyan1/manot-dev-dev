import React from 'react';
import './ProfileAndPassword.css';

function ProfileAndPassword() {
    return (
        <>
            <div className='h'>
                Profile and password
            </div>

            <div className='full_name_div'>
                Full name
            </div>
            <input className='full_name_input' type='text'/>

            <div className='email_div'>
                Email
            </div>
            <input className='email_input' type='text'/>

            <div className='new_password_div'>
                New password
            </div>
            <input className='new_password_input' type='text'/>

            <div className='repeat_password_div'>
                Repeat new password
            </div>
            <input className='repeat_password_input' type='text'/>

            <button className='submit_button' type='button'>
                {/* <div className='submit_text'> */}
                    Save changes
                {/* </div> */}
            </button>
        </>
    )
}

export default ProfileAndPassword;