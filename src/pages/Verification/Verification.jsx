import Header from '../../components/Header/Header';
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { ReactComponent as ReactLogo } from '../../styles/images/manot_logo.svg';
import ReactCodeInput from 'react-code-input';
// import { reactCodeInput } from 'CodeInputField.scss';
import './Verification.scss';

function Verification() {
    const history = useHistory();

    return (
        <>
            <Header />
            <ReactCodeInput type='text' fields={6}/>
        </>
    )
}

export default Verification;