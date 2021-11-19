import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import './InputComponent.scss';

function InputComponent({ label, type, helperText, value, onChange, error }) {
    return (
        <>
            <TextField
                type={type}
                error={error}
                label={label}
                value={value}
                onChange={onChange}
                variant="outlined" size="small"
                color="secondary"
                helperText={helperText}
                style={{
                    width: '80%',
                    margin: '9px',
                    // borderRadius: '13px'
                }} />
            {/* <p>a</p> */}
        </>
    )
}

export default InputComponent;