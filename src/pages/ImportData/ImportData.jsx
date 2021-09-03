import React from 'react';
import { useState } from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import ImageUploading from 'react-images-uploading';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import './ImportData.scss';

function ImportData(props) {
    const [open, setOpen] = useState(false);
    const [folderName, setFolderName] = useState('')
    const [isFolderNameCreated, setIsFolderNameCreated] = useState(false)
    const handleOpen = () => {
        setOpen(true);
        setFolderName('');
    }
    const handleClose = () => {
        setOpen(false);
        setIsFolderNameCreated(true);
    };

    const [images, setImages] = useState([]);
    const maxNumber = 69;

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
                <div claassName='folder-name-conatiner'>
                    {isFolderNameCreated
                        && (<div>
                            <FolderOpenIcon />
                            {folderName}
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
                                    <AddPhotoAlternateIcon
                                        style={isDragging ? { color: 'red' } : undefined}
                                        onClick={onImageUpload}
                                        {...dragProps}
                                    />
                                )}
                            </ImageUploading>
                            <span onClick={handleOpen}>
                                <EditIcon />
                            </span>
                            <span onClick={() => {
                                setIsFolderNameCreated(false);
                            }
                            }>
                                <DeleteIcon />
                            </span>
                        </div>)
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
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                    >
                        <DialogTitle
                            className="dialog-title"
                            onClose={handleClose}
                        >
                            Data’s folder creation
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
                                value={folderName} />
                        </DialogContent>
                        <DialogActions className='dialog-action'>
                            <button
                                className='continue-button'
                                onClick={handleClose}
                                color="primary"
                            >
                                Create
                            </button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </>
    )
}

export default ImportData;