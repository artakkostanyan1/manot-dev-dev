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
    const [openEdit, setOpenEdit] = useState(false);
    const [folderName, setFolderName] = useState('');
    const [foldersNames, setFoldersNames] = useState([]);
    const [isFolderNameCreated, setIsFolderNameCreated] = useState(false);
    const [editFolderName, setEditFolderName] = useState(false);
    const [toggle, setToggle] = useState(false);
    // const [errMessage, setErrMessage] = useState(false);
    const styles = {
        cancelButton: {
            background: 'lightgray',
            border: '1px solid lightgray',
            width: '162px',
            height: '33px',
            boxSizing: 'border-box',
            borderRadius: '13px',
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '14px',
            lineHeight: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            marginBottom: '10px',
            cursor: 'pointer',
            position: 'absolute',
            top: '210px',
            left: '65px'
        }
    };
    const handleOpen = () => {
        setOpen(true);
        setFolderName('');
        // setErrMessage(false)
    };
    const handleClose = () => {
        setOpen(false);
        // setErrMessage(false)
    };
    const handleCreate = (e) => {
        e.preventDefault();
        setFoldersNames((foldersNames) => { return folderName && [...foldersNames, folderName] });
        folderName && setOpen(false);
        folderName && setIsFolderNameCreated(true);
        setToggle(!toggle)
        // console.log('done');
        // setErrMessage(!folderName);
    };

    const handleEditCreate = (e) => {
        e.preventDefault();
        setFoldersNames((foldersNames) => { return editFolderName && [...foldersNames, editFolderName] });
        editFolderName && setOpenEdit(false);
        // editFolderName && setIsFolderNameCreated(true);
    }

    const handleToggle = (e) => {
        e.preventDefault();
        setToggle(!toggle);
        // editFolderName && setIsFolderNameCreated(true);
    }

    const handleOpenEdit = () => {
        setOpenEdit(true);
        setEditFolderName(folderName);
    };

    const editFileName = () => {
        setOpen(true);
        setEditFolderName(true);
    }

    const [images, setImages] = useState([]);
    const maxNumber = 69;
    const maxlimit = 15;
    let imageList;

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };


    const isDataExist = isFolderNameCreated ? 'min' : 'max';
    return (
        <div className='import_container'>

            <UserHeader />

            <div className={`comp-import-data-${isDataExist}`}>
                <div className='folder-name-conatiner'>
                    {isFolderNameCreated && <h3 className='imported-data-title'>Your imported data.</h3>}
                    {isFolderNameCreated && <div className='folders-container'>
                        {foldersNames.map((el) => {
                            return (
                                <>
                                    <div>
                                        <img src='folder.svg' alt='folder' />
                                        <span className='folder-name'>
                                            {((el).length > maxlimit) ?
                                                (((el).substring(0, maxlimit - 3)) + '...') :
                                                el}
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
                        })
                        }
                    </div>}
                    <Dialog
                        className='folder-dialog'
                        aria-labelledby="customized-dialog-title"
                        open={toggle}
                    >
                        <DialogTitle
                            className="dialog-title"
                        >
                            Confirm
                        </DialogTitle>
                        <DialogContent>
                            {`You are ipotrdet ${imageList?.length} photos`}
                        </DialogContent>
                        <DialogActions className='dialog-action'>
                            <button
                                type='submit'
                                className='continue-button'
                                onClick={handleToggle}
                                color="primary"
                            >
                                Confirm
                            </button>
                        </DialogActions>
                    </Dialog>
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
                        // className='folder-dialog'
                        PaperProps={{
                            style: {
                                borderRadius: '25px',
                                background: '#FFFFFF',
                                border: '3px solid #257AAF'
                            }
                        }}
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
                        >
                            Data’s folder creation
                        </DialogTitle>
                        <form onSubmit={handleCreate}>
                            <input
                                className="folder-name-input"
                                onChange={(e) => {
                                    setFolderName(e.target.value);
                                }}
                                type='text'
                                autoFocus
                                placeholder='Folder Name'
                                value={folderName}
                                required
                            />
                            <div className='dialog-action'>
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
                                            <button
                                                type='submit'
                                                className='continue-button'
                                                // onClick={handleCreate}
                                                color="primary"
                                                style={isDragging ? { color: 'red' } : undefined}
                                                onClick={folderName && onImageUpload}
                                                {...dragProps}
                                            >
                                                Create
                                            </button>
                                        </span>
                                    )}
                                </ImageUploading>
                            </div>
                        </form>
                        <button
                            style={styles.cancelButton}
                            onClick={handleClose}
                            color="primary"
                        >
                            Cancel
                        </button>
                    </Dialog>

                    <Dialog
                        className='folder-dialog'
                        // onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={openEdit}
                    >
                        <div className='header-icons-container'>
                            {/* <MinimizeIcon /> */}
                            {/* <Crop169Icon /> */}
                            <div onClick={handleClose}>
                                <CloseIcon />
                            </div>
                        </div>
                        <DialogTitle
                            className="dialog-title"
                        // onClose={handleClose}
                        >
                            Edit Folder Name
                        </DialogTitle>
                        <form onSubmit={handleEditCreate}>
                            <DialogContent>
                                <input
                                    className="folder-name-input"
                                    onChange={(e) => {
                                        setEditFolderName(e.target.value);
                                        console.log('e', e.target.value)
                                    }}
                                    type='text'
                                    autoFocus
                                    placeholder='Folder Name'
                                    value={editFolderName}
                                    required
                                    validationErrors={{
                                        isDefaultRequiredValue: 'Field is required'
                                    }}
                                />
                            </DialogContent>
                            <DialogActions className='dialog-action'>
                                <button
                                    type='submit'
                                    className='continue-button'
                                    onClick={handleEditCreate}
                                    color="primary"
                                >
                                    Confirm
                                </button>
                                <button
                                    className='continue-button'
                                    onClick={handleClose}
                                    color="primary"
                                >
                                    Cancle
                                </button>
                            </DialogActions>
                        </form>
                    </Dialog>
                </div>
            </div>
        </div >
    )
}

export default ImportData;