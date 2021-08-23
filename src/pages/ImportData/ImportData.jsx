import UserHeader from '../../components/UserHeader/UserHeader';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import './ImportData.scss';

function ImportData(props) {
    return (
        <>
            <UserHeader />
            <div className='import-data-container'>
                <span className='header-text'>
                Welcome to <b>manot</b> annotation studio!
                </span>
                <span className='small-header'>To get started please import the data.</span>
                <button className='import-button'>
                    <p className='import-text'>Import data</p>
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

export default ImportData;