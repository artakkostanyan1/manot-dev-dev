import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserHeader from '../../components/UserHeader/UserHeader';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloseIcon from '@material-ui/icons/Close';
import ImageUploading from 'react-images-uploading';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import QuestionMark from '../../styles/images/question-mark.svg';
import ErrorPopup from '../../components/ErrorPopup/ErrorPopup';
import Loader from '../../components/Loader/Loader';
import './ImportData.scss';
import paths from '../../utils/routing';

require('dotenv').config();

function ImportData(props) {
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(null);
    const [folder_name, setFolderName] = useState('');
    const [foldersNames, setFoldersNames] = useState([]);
    const [isFolderNameCreated, setIsFolderNameCreated] = useState(false);
    const [editFolderName, setEditFolderName] = useState('');
    const [deleteToggle, setDeleteToggle] = useState(null);
    const [imagesArray, setImagesArray] = useState([]);
    const [newImagesArray, setNewImagesArray] = useState([]);
    const [toggleAddImages, setToggleAddImages] = useState(false);
    const [togglePopup, setTogglePopup] = useState(false);
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_URL;

    const [elementToEdit, setElementToEdit] = useState('');
    const [elementToDelete, setElementToDelete] = useState('');
    const [elementToAdd, setElementToAdd] = useState('');

    const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const history = useHistory();
    const maxlimit = 10;

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

    const createPicFoder = (data, isAbleToRedirect) => {
        fetch(`${apiUrl}create-folder?folder_name=${data.folder_name}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": token,
            },
        })
            .then(response => response.json())
            .then(response => (response.status === 'success' && data.images.length)
                ? addPhotos(data, false)
                : response)
            .then(data => {
                if (data?.status === 'success') {
                    setOpen(false);
                    isAbleToRedirect && history.push(paths.Desktop)
                } else if (data?.status === 'fail') {
                    setErrorMessage(data.message);
                    setTogglePopup(!togglePopup);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const addPhotos = (data, isAddData) => {
        fetch(`${apiUrl}add-image`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": token,
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then((data) => {
                isAddData && handleAddImages();
                if (data.status === 'success') {
                    handleAddImages();
                    history.push(paths.Desktop);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const editFileName = (data) => {
        fetch(`${apiUrl}rename-folder?folder_name=${data.folder_name}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": token,
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then((success) => {
                console.log('Success', success)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    const deleteFile = (data) => {
        fetch(`${apiUrl}delete-folder?folder_name=${data}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": token,
            },
        })
            .then(response => response.json())
            .then((success) => {
                console.log('Success', success);
                ToggleDelete();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const onChange = (imageList) => {
        setImagesArray(imageList);
        setNewImagesArray(imageList);
    };
    const handleOpen = () => {
        setOpen(true);
        setFolderName('');
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleEditToggle = (el) => {
        setOpenEdit(!openEdit);
        setEditFolderName(el);
    }
    const ToggleDelete = (el = null) => {
        setDeleteToggle(el);
    }
    const handleAddImages = (el = null) => {
        setToggleAddImages(!toggleAddImages);
    }
    const handleCreate = (e) => {
        let images = [];
        e.preventDefault();
        !foldersNames.includes(folder_name)
            && setFoldersNames((foldersNames) => {
                return folder_name && [...foldersNames, folder_name]
            });

        Promise.all(imagesArray.map((element) => {
            return new Promise((res) => {
                let i = new Image();
                i.onload = () => {
                    res({
                        image: element.data_url,
                        width: i.width,
                        height: i.height,
                        size: element.file.size,
                    })
                };
                i.src = element.data_url;
            })
        }))
            .then((images) => {
                const data = {
                    folder_name: folder_name,
                    images: images,
                }
                createPicFoder(data, images.length);
            })
        folder_name && setIsFolderNameCreated(true);
    };

    const handleEditCreate = (el) => {
        editFolderName && setOpenEdit(false);
        const data = {
            folder_name: el,
            new_folder_name: editFolderName,
        }
        editFileName(data);
        let newNames = foldersNames.filter((element) => {
            return element !== el;
        })
        setFolderName(newNames);
    }

    const addImages = (el) => {
        const images = [];
        Promise.all(newImagesArray.map((element) => {
            return new Promise((res) => {
                let i = new Image();
                i.onload = () => {
                    res({
                        image: element.data_url,
                        width: i.width,
                        height: i.height,
                        size: element.file.size,
                    })
                };
                i.src = element.data_url;
            })
        }))
            .then((images) => {
                const data = {
                    folder_name: el,
                    images: images,
                }
                images.length ? addPhotos(data) : setTogglePopup(true);
            })
    }

    useEffect(() => {
        fetch(`${apiUrl}get-folders`, {
            method: 'GET',
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
        })
            .then(response => {
                if (response.status === 422) {
                    setError(true)
                }
                return response.json();
            })
            .then(data => {
                setFoldersNames(data.message);
                data.success !== 'fail' ? setIsFolderNameCreated(true) : setIsFolderNameCreated(false);
                setIsLoading(false);
            })
            .catch(err => {
                console.log('Errrr', err);
            })
    }, [elementToAdd, elementToDelete])

    const isDataExist = !error ? 'min' : 'max';
    const chooseBtn = { ...styles.chooseButton, ...styles.Button };
    const cancelBtn = { ...styles.cancelButton, ...styles.Button };
    return (
        <>
            {isLoading ? <Loader /> : <div className='import_container'>
                <UserHeader />
                <div className={`comp-import-data-${isDataExist}`}>
                    <div className='folder-name-conatiner'>
                        {!error && <h3 className='imported-data-title'>Your imported data.</h3>}
                        {isFolderNameCreated && <div className='folders-container'>
                            {!error && foldersNames.map((el, index) => {
                                return (
                                    <>
                                        <div key={index}>
                                            <img src='folder.svg' alt='folder' />
                                            <span className='folder-name'>
                                                {((el).length > maxlimit) ?
                                                    (((el).substring(0, maxlimit - 3)) + '...') :
                                                    el}
                                            </span>

                                            <span onClick={() => {
                                                setElementToAdd(el)
                                                handleAddImages(el)
                                            }}>
                                                <img alt='add' src='photo.svg' />
                                            </span>

                                            <span onClick={() => {
                                                setElementToEdit(el)
                                                handleEditToggle(el)
                                            }}>
                                                <img src='edit.svg' alt='edit' />
                                            </span>
                                            <span onClick={() => {
                                                setElementToDelete(el)
                                                ToggleDelete(el)
                                            }}>
                                                <img src='delete.svg' alt='delete folder' />
                                            </span>
                                        </div>
                                    </>
                                )
                            })
                            }
                        </div>}
                    </div>

                    {/* This is Add image dialog */}
                    <Dialog
                        PaperProps={{
                            style: {
                                borderRadius: '25px',
                                background: '#FFFFFF',
                                border: '3px solid #257AAF'
                            }
                        }}
                        open={toggleAddImages}
                    >
                        <div className='header-icons-container'>
                            <div onClick={handleAddImages}>
                                <CloseIcon />
                            </div>
                        </div>
                        <DialogTitle
                            className="dialog-title"
                        >
                            Upload images to choosen folder
                        </DialogTitle>
                        <ImageUploading
                            multiple
                            value={newImagesArray}
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
                                    {newImagesArray.length !== 0 && <div>{`YOU CHOOSED ${newImagesArray.length} PHOTOS`}</div>}
                                </span>
                            )}
                        </ImageUploading>
                        <div className='dialog-action'>
                            <span>
                                <button
                                    type='submit'
                                    className='continue-button'
                                    color="primary"
                                    onClick={() => addImages(elementToAdd)}
                                >
                                    Create
                                </button>
                            </span>
                            {<ErrorPopup togglePopup={togglePopup} togglePopupf={setTogglePopup} errMsg={'Please choose photo'} />}
                        </div>
                        <button
                            style={cancelBtn}
                            onClick={handleAddImages}
                            color="primary"
                        >
                            Cancel
                        </button>
                    </Dialog>

                    {/* This is Edit dialog*/}
                    <Dialog
                        PaperProps={{
                            style: {
                                borderRadius: '25px',
                                background: '#FFFFFF',
                                border: '3px solid #257AAF'
                            }
                        }}
                        className='folder-dialog'
                        onClose={handleEditToggle}
                        aria-labelledby="customized-dialog-title"
                        open={openEdit}
                    >
                        <div className='header-icons-container'>
                            <div onClick={handleEditToggle}>
                                <CloseIcon />
                            </div>
                        </div>
                        <DialogTitle
                            className="dialog-title"
                        >
                            Edit Folder Name
                        </DialogTitle>
                        <>
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
                                    className='continue-button'
                                    onClick={() => handleEditCreate(elementToEdit)}
                                    color="primary"
                                >
                                    Confirm
                                </button>
                                <button
                                    className='continue-button'
                                    onClick={handleEditToggle}
                                    color="primary"
                                >
                                    Cancle
                                </button>
                            </DialogActions>
                        </>
                    </Dialog>
                    {/* This is Add image dialog */}
                    {/* <Dialog
                        PaperProps={{
                            style: {
                                borderRadius: '25px',
                                background: '#FFFFFF',
                                border: '3px solid #257AAF'
                            }
                        }}
                        open={toggleAddImages}
                    >
                        <div className='header-icons-container'>
                            <div onClick={handleAddImages}>
                                <CloseIcon />
                            </div>
                        </div>
                        <DialogTitle
                            className="dialog-title"
                        >
                            Upload images to choosen folder
                        </DialogTitle>
                        <ImageUploading
                            multiple
                            value={newImagesArray}
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
                                    {newImagesArray.length !== 0 && <div>{`YOU CHOOSED ${newImagesArray.length} PHOTOS`}</div>}
                                </span>
                            )}
                        </ImageUploading>
                        <div className='dialog-action'>
                            <span>
                                <button
                                    type='submit'
                                    className='continue-button'
                                    color="primary"
                                    onClick={() => addImages(elementToAdd)}
                                >
                                    Create
                                </button>
                            </span>
                        </div>
                        <button
                            style={cancelBtn}
                            onClick={handleAddImages}
                            color="primary"
                        >
                            Cancel
                        </button>
                    </Dialog> */}

                    {/* This is Edit dialog*/}
                    {/* <Dialog
                        PaperProps={{
                            style: {
                                borderRadius: '25px',
                                background: '#FFFFFF',
                                border: '3px solid #257AAF'
                            }
                        }}
                        className='folder-dialog'
                        onClose={handleEditToggle}
                        aria-labelledby="customized-dialog-title"
                        open={openEdit}
                    >
                        <div className='header-icons-container'>
                            <div onClick={handleEditToggle}>
                                <CloseIcon />
                            </div>
                        </div>
                        <DialogTitle
                            className="dialog-title"
                        >
                            Edit Folder Name
                        </DialogTitle>
                        <>
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
                                    className='continue-button'
                                    onClick={() => handleEditCreate(elementToEdit)}
                                    color="primary"
                                >
                                    Confirm
                                </button>
                                <button
                                    className='continue-button'
                                    onClick={handleEditToggle}
                                    color="primary"
                                >
                                    Cancle
                                </button>
                            </DialogActions>
                        </>
                    </Dialog> */}

                    {/* This is Delete dialog*/}
                    <Dialog
                        PaperProps={{
                            style: {
                                borderRadius: '25px',
                                background: '#FFFFFF',
                                border: '3px solid #257AAF'
                            }
                        }}
                        className='folder-dialog'
                        aria-labelledby="customized-dialog-title"
                        open={!!deleteToggle}
                    >
                        <div className='header-icons-container'>
                            <div onClick={(el) => {
                                setElementToDelete(el);
                                setDeleteToggle(null)
                            }}>
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
                                    deleteFile(elementToDelete);
                                    setElementToDelete('')
                                }}
                                color="primary"
                            >
                                OK
                            </button>
                            <button
                                className='continue-button'
                                onClick={ToggleDelete}
                                color="primary"
                            >
                                Cancel
                            </button>
                        </DialogActions>
                    </Dialog>

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
                            {<ErrorPopup togglePopup={togglePopup} togglePopupf={setTogglePopup} errMsg={errorMessage} />}
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
                    </div>
                </div>
            </div >}
        </>

    )
}

export default ImportData;
