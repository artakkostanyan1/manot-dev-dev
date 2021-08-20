import Header from '../../common/Header/Header';
// import SystemUpdateAltOutlinedIcon from '@material-ui/icons/SystemUpdateAltOutlined';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { withTranslation } from 'react-i18next';
import './ImportData.scss';

function ImportData(props) {
    return (
        <>
            <Header />
            <div className='import-data-container'>
                <span className='header-text'>
                {props.t('welcome_text')} <b>manot</b> {props.t('welcome_text1')}
                </span>
                <span className='small-header'>{props.t('small_welcome_text')}</span>
                <button className='import-button'>
                    <p className='import-text'>{props.t('import_data')}</p>
                    <CloudUploadIcon
                        style={{
                            width: '85px',
                            height: '85px',
                            color: '#fff',
                            marginBottom: '8px'
                        }}
                    />
                </button>
            </div>
        </>
    )
}

export default withTranslation()(ImportData);