import React from 'react';
import { useState } from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloseIcon from '@material-ui/icons/Close';
// import MinimizeIcon from '@material-ui/icons/Minimize';
// import Crop169Icon from '@material-ui/icons/Crop169';
// import ImageUpload from '../../components/ImageUpload/ImageUpload';
import ImageUploading from 'react-images-uploading';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import './ImportData.scss';

function ImportData(props) {
    const [open, setOpen] = useState(false);
    const [folderName, setFolderName] = useState('');
    const [isFolderNameCreated, setIsFolderNameCreated] = useState(false);
    const [changeFolderName, setChangeFolderName] = useState(false);
    const [errMessage, setErrMessage] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        setFolderName('');
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCreate = () => {
        (folderName).length !== 0 && setOpen(false);
        (folderName).length !== 0 && setIsFolderNameCreated(true);
        (folderName).length === 0 && setErrMessage(!errMessage);
    };
    const editFileName = () => {
        setOpen(true);
        setChangeFolderName(true);
    }

    const [images, setImages] = useState([]);
    const maxNumber = 69;
    const maxlimit = 15;

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };


    const isDataExist = isFolderNameCreated ? 'min' : 'max';
    return (
        <>
            <UserHeader />
            <div className={`comp-import-data-${isDataExist}`}>
                <div className='folder-name-conatiner'>
                    {isFolderNameCreated
                        && (
                            <>
                                <h3 className='imported-data-title'>Your imported data.</h3>
                                <div>
                                    <img src='folder.svg' alt='folder' />
                                    <span className='folder-name'>
                                        {((folderName).length > maxlimit) ?
                                            (((folderName).substring(0, maxlimit - 3)) + '...') :
                                            folderName}
                                    </span>
                                    <ImageUploading
                                        multiple
                                        value={images}
                                        onChange={onChange}
                                        maxNumber={maxNumber}
                                        dataURLKey="data_url"
                                    >
                                        {({
                                            imageList,
                                            onImageUpload,
                                            isDragging,
                                            dragProps,
                                        }) => (
                                            <span>
                                                <img
                                                    alt='add'
                                                    src='photo.svg'
                                                    style={isDragging ? { color: 'red' } : undefined}
                                                    onClick={onImageUpload}
                                                    {...dragProps}
                                                />
                                            </span>
                                        )}
                                    </ImageUploading>
                                    <span onClick={editFileName}>
                                        <img src='edit.svg' alt='edit' />
                                    </span>
                                    <span onClick={() => {
                                        setIsFolderNameCreated(false);
                                    }
                                    }>
                                        <img src='delete.svg' alt='delete folder' />
                                    </span>
                                </div>
                            </>
                        )
                    }
                </div>
                <div className='import-data-container'>
                    <span className='header-text'>
                        Welcome to <b>manot</b> annotation studio!
                    </span>
                    <span className='small-header'>To get started please import the data.</span>
                    <button
                        className='import-button'
                        onClick={handleOpen}
                    >
                        <p className='import-text'>Import data</p>
                        <CloudUploadIcon
                            style={{
                                width: '85px',
                                height: '85px',
                                color: '#fff',
                                marginBottom: '8px',
                            }}
                        />
                    </button>
                    <Dialog
                        className='folder-dialog'
                        // onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                    >
                        <div className='header-icons-container'>
                            {/* <MinimizeIcon /> */}
                            {/* <Crop169Icon />  */}
                            <div onClick={handleClose}>
                                <CloseIcon />
                            </div>
                        </div>
                        <DialogTitle
                            className="dialog-title"
                        // onClose={handleClose}
                        >
                            {changeFolderName ? 'Edit Folder Name' : 'Data’s folder creation'}
                        </DialogTitle>
                        <DialogContent>
                            <input
                                className="folder-name-input"
                                onChange={(e) => {
                                    setFolderName(e.target.value);
                                    console.log('e', e.target.value)
                                }}
                                type='text'
                                autoFocus
                                placeholder='Folder Name'
                                value={folderName}
                            />
                            {errMessage && <div className='error_message'>Please write a folder name</div>}
                        </DialogContent>
                        <DialogActions className='dialog-action'>
                            <button
                                className='continue-button'
                                onClick={handleCreate}
                                color="primary"
                            >
                                {changeFolderName ? 'Confirm' : 'Create'}
                            </button>
                            <button
                                className='continue-button'
                                onClick={handleClose}
                                color="primary"
                            >
                                {/* {changeFolderName ? 'Confirm' : 'Create'} */}
                                Cancle
                            </button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </>
    )
}

export default ImportData;