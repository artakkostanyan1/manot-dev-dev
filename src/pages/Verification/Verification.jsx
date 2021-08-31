import Header from '../../components/Header/Header';
import { useHistory } from "react-router-dom";
import ReactCodeInput from 'react-code-input';
// import { reactCodeInput } from 'CodeInputField.scss';
import './Verification.scss';

function Verification() {
    const history = useHistory();

    return (
        <div className='verify_container'>
            <Header />
            <div className='sub_container'>
                <div className='verification_label'>
                    Verification
                </div>
                <ReactCodeInput
                    type='text'
                    fields={4}
                    inputStyle={{
                        fontFamily: 'monospace',
                        margin: '27px',
                        marginBottom: '125px',
                        marginTop: '80px',
                        MozAppearance: 'textfield',
                        width: '82px',
                        borderRadius: '3px',
                        fontSize: '48px',
                        height: '108px',
                        paddingLeft: '7px',
                        backgroundColor: '#FFF',
                        color: 'black',
                        border: '1px solid #257AAF',
                        textAlign: 'center'
                    }}
                />
                <button
                    className='verify_button'
                    onClick={() => console.log('verify')}
                >
                    <div className='submit_text'>
                        Verify
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Verification;