import Header from '../../common/Header/Header';
import SystemUpdateAltOutlinedIcon from '@material-ui/icons/SystemUpdateAltOutlined';
import './ImportData.scss';

function ImportData() {
    return (
        <>
            <Header />
            <div className='import-data-container'>
                <span className='header-text'>
                    Welcome to <b>manot</b> annotation studio!
                </span>
                <span className='small-header'>To get started please import the data.</span>
                <button className='import-button'>
                    <p className='import-text'>Import data</p>
                    <SystemUpdateAltOutlinedIcon
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