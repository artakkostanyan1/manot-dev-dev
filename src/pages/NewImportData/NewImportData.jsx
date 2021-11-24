import { useState } from 'react';
import { ReactComponent as UploadImg } from '../../styles/images/upload_img.svg';
import UserHeader, { CustomMenu } from '../../components/UserHeader/UserHeader';
import TextField from '@mui/material/TextField';
import './NewImportData.scss';


function ImportData() {
    const [folder_name, setFolderName] = useState('');
    const [toggleMenu, setToggleMenu] = useState(false);

    const showMenu = toggleMenu ? 'show__menu' : 'hide__menu';

    const handleToggle = (data) => {
        setToggleMenu(data)
    }

    return (
        <>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                <div className={`profile_container ${showMenu}`}>
                    <UserHeader handleToggle={handleToggle} showBurger={toggleMenu} />
                    <div className='starting__header'>
                        <hr className='starting__header__first__line' />
                        <span>let's get started</span>
                        <hr className='starting__header__second__line' />
                    </div>

                    <div className={`upload__wrapper ${showMenu}`}>
                        <div className='upload__subwrapper'>
                            <div>Start with...</div>
                            <TextField label='folder name' variant="outlined" size="small" color="secondary"
                                value={folder_name} onChange={(e) => setFolderName(e.target.value)}
                                style={{
                                    width: '450px',
                                    margin: '9px'
                                }} />
                            <div style={{marginTop: '30px'}}>Then...</div>
                            <span>
                                <UploadImg />
                            </span>
                            <div className='upload__button__wrapper'>
                                <button
                                    type='submit'
                                    className='button__component'
                                    style={{
                                        width: '287px',
                                        height: '46px'
                                    }}
                                // onClick={handleSubmit}
                                >
                                    and proceed to annotation
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
                {toggleMenu && <CustomMenu handleToggle={handleToggle} />}
            </div>
        </>
    )
}

export default ImportData;