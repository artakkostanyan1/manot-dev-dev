import { useState, useEffect } from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloseIcon from '@material-ui/icons/Close';
import ImageUploading from 'react-images-uploading';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import QuestionMark from '../../styles/images/question-mark.svg';
import './ImportData.scss';

function ImportData() {
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [folder_name, setFolderName] = useState('');
    const [foldersNames, setFoldersNames] = useState([]);
    const [isFolderNameCreated, setIsFolderNameCreated] = useState(false);
    const [editFolderName, setEditFolderName] = useState(false);
    const [deleteToggle, setDeleteToggle] = useState(false);
    const [imagesArray, setImagesArray] = useState([]);
    const token = localStorage.getItem('token');
    const maxlimit = 15;

    const styles = {
        Button: {
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
            cursor: 'pointer',
            position: 'absolute',
            left: '65px'
        },
        chooseButton: {
            background: 'lightblue',
            border: '1px solid lightblue',
            color: '#ffffff',
            top: '200px',
        },
        cancelButton: {
            background: 'lightgray',
            border: '1px solid lightgray',
            color: '#ffffff',
            top: '210px',
            marginBottom: '10px',
            marginTop: '40px',
        }
    };

    const createPicFoder = (data) => {
        fetch('http://localhost:5000/api/v1/create-folder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": token,
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const addPhotos = (data) => {
        fetch('http://localhost:5000/api/v1/add-img', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": token,
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then((data) => {
                setOpen(true);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const editFileName = (data) => {
        fetch('http://localhost:5000/url/api/v1/rename-folder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": token,
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then((data) => {
                setOpen(true);
                setEditFolderName(true);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const deleteFile = (data) => {
        fetch('http://localhost:5000/url/api/v1/delete-folder', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": token,
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then((data) => {
                setOpen(true);
                setEditFolderName(true);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    const onChange = (imageList) => {
        setImagesArray(imageList);
    };
    const handleOpen = () => {
        setOpen(true);
        setFolderName('');
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleEditOpen = () => {
        setOpenEdit(true);
    }
    const handleCloseEdit = () => {
        setOpenEdit(false);
    }
    const handleDelete = () => {
        setDeleteToggle(true);
        deleteFile();
    }
    const handleCreate = (e) => {
        let images = [];
        e.preventDefault();
        setFoldersNames((foldersNames) => { return folder_name && [...foldersNames, folder_name] });
        folder_name && setOpen(false);
        imagesArray.map((el) => {
            let i = new Image();
            i.onload = function () {
                images.push({
                    image: el.data_url,
                    width: i.width,
                    height: i.height,
                    size: el.file.size,
                })
            };
            i.src = el.data_url;
        })
        const data = {
            folder_name,
            images,
        }
        images ? createPicFoder(data.folder_name) : addPhotos(data);
        folder_name && setIsFolderNameCreated(true);
        //editFolderName && setIsFolderNameCreated(true);
        console.log('images', data);
    };

    const handleEditCreate = (e) => {
        e.preventDefault();
        setFoldersNames((foldersNames) => { return editFolderName && [...foldersNames, editFolderName] });
        editFolderName && setOpenEdit(false);
        editFileName();
        // editFolderName && setIsFolderNameCreated(true);
    }

    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/get-folders`, {
            method: 'GET',
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
    }, [])

    const isDataExist = isFolderNameCreated ? 'min' : 'max';
    const chooseBtn = { ...styles.chooseButton, ...styles.Button };
    const cancelBtn = { ...styles.cancelButton, ...styles.Button };
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
                                            value={imagesArray}
                                            onChange={onChange}
                                            acceptType={['jpg', 'jpeg', 'png']}
                                            maxFileSize={100000}
                                            resolutionWidth={1024}
                                            resolutionHeight={1024}
                                            dataURLKey="data_url"
                                        >
                                            {({
                                                onImageUpload
                                            }) => (
                                                <span>
                                                    <img
                                                        alt='add'
                                                        src='photo.svg'
                                                        onClick={onImageUpload}
                                                    />
                                                </span>
                                            )}
                                        </ImageUploading>
                                        <span onClick={handleEditOpen}>
                                            <img src='edit.svg' alt='edit' />
                                        </span>
                                        <span onClick={() => setDeleteToggle}>
                                            <img src='delete.svg' alt='delete folder' />
                                        </span>
                                        <Dialog
                                            className='folder-dialog'
                                            aria-labelledby="customized-dialog-title"
                                            open={deleteToggle}
                                        >
                                            <div className='header-icons-container'>
                                                <div onClick={() => setDeleteToggle(false)}>
                                                    <CloseIcon />
                                                </div>
                                            </div>
                                            <DialogContent className='delete-context'>
                                                <img src={QuestionMark} alt="Question mark" />
                                                Are you sure you want to delete this item?
                                            </DialogContent>
                                            <DialogActions className='dialog-action'>
                                                <button
                                                    className='continue-button'
                                                    onClick={() => {
                                                        setIsFolderNameCreated(false);
                                                        handleDelete(false);
                                                    }}
                                                    color="primary"
                                                >
                                                    OK
                                                </button>
                                                <button
                                                    className='continue-button'
                                                    onClick={() => setDeleteToggle(false)}
                                                    color="primary"
                                                >
                                                    Cancel
                                                </button>
                                            </DialogActions>
                                        </Dialog>
                                    </div>
                                </>
                            )
                        })
                        }
                    </div>}
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
                                value={folder_name}
                                required
                            />
                            <div className='dialog-action'>
                                <span>
                                    <button
                                        type='submit'
                                        className='continue-button'
                                        color="primary"
                                    >
                                        Create
                                    </button>
                                </span>
                            </div>
                        </form>
                        <ImageUploading
                            multiple
                            value={imagesArray}
                            onChange={onChange}
                            acceptType={['jpg', 'jpeg', 'png']}
                            maxFileSize={100000}
                            resolutionWidth={1024}
                            resolutionHeight={1024}
                            dataURLKey="data_url"
                        >
                            {({
                                onImageUpload
                            }) => (
                                <span>
                                    <button
                                        className='choose-button'
                                        color="primary"
                                        onClick={onImageUpload}
                                        style={chooseBtn}
                                    >
                                        Choose photo
                                    </button>
                                    {imagesArray.length !== 0 && <div>{`YOU CHOSSED ${imagesArray.length} PHOTOS`}</div>}
                                </span>
                            )}
                        </ImageUploading>
                        <button
                            style={cancelBtn}
                            onClick={handleClose}
                            color="primary"
                        >
                            Cancel
                        </button>
                    </Dialog>

                    <Dialog
                        className='folder-dialog'
                        onClose={handleEditOpen}
                        aria-labelledby="customized-dialog-title"
                        open={openEdit}
                    >
                        <div className='header-icons-container'>
                            <div onClick={handleCloseEdit}>
                                <CloseIcon />
                            </div>
                        </div>
                        <DialogTitle
                            className="dialog-title"
                        >
                            Edit Folder Name
                        </DialogTitle>
                        <form onSubmit={handleEditCreate}>
                            <DialogContent>
                                <input
                                    className="folder-name-input"
                                    onChange={(e) => {
                                        setEditFolderName(e.target.value);
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
                                    onClick={handleCloseEdit}
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