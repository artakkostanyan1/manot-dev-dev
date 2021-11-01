import { useState } from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import Alert from 'react-popup-alert';
import './ContactUs.scss';

function ContactUs() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');
    const [alert, setAlert] = useState({
        type: 'error',
        text: 'This is a alert message',
        show: false
    })


    function onCloseAlert() {
        setAlert({
            type: '',
            text: '',
            show: false
        })
    }

    function onShowAlert(type) {
        setAlert({
            type: type,
            text: 'Demo alert',
            show: true
        })
    }

    const handleClick = () => {
        let data = {
            name,
            email,
            msg
        }

        if (!(name && email && msg)) {
            onShowAlert('error')
        }

        console.log(data);
    }

    return (
        <div className='contact_us_container'>
            <UserHeader />
            <div className='contact_us_sub_container'>
                <h7 className='contact_us_header_txt'>
                    We would love to hear from you! Contact us and share any feedback or questions you may have.
                </h7>
                <div className='inputs_container'>
                    <input
                        type='text'
                        className='contact_us_name_input'
                        placeholder='Your Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type='email'
                        placeholder='Your Email Address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <textarea
                    className='contact_us_textarea'
                    placeholder='Your Message'
                    name="" id="" cols="30" rows="10"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                >
                </textarea>
                <div className='contact_us_button_container'>
                    <button onClick={handleClick}>
                        Submit
                    </button>
                </div>
            </div>
            <Alert
                header={'Header'}
                btnText={'Close'}
                text={alert.text}
                type={alert.type}
                show={alert.show}
                onClosePress={onCloseAlert}
                pressCloseOnOutsideClick={true}
                showBorderBottom={true}
                alertStyles={{
                height: '200px',
                width: '50px'
                }}
                headerStyles={{}}
                textStyles={{}}
                buttonStyles={{
                    width: '200px',
                    height: '40px',
                
                    marginTop: '15px',
                
                    background: '#f86878',
                    border: '1px solid #f86878',
                    boxSizing: 'border-box',
                    borderRadius: '30px',
                
                    color: 'white'
                }}
            />

        </div>
    )
}

export default ContactUs;