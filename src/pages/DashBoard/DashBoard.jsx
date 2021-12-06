import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserHeader, { CustomMenu } from '../../components/UserHeader/UserHeader';
import { ReactComponent as UploadBtnImg } from '../../styles/images/import_img.svg';
import { ReactComponent as AddImg } from '../../styles/images/add_img.svg';
import { ReactComponent as EditImg } from '../../styles/images/edit_img.svg';
import { ReactComponent as DeleteImg } from '../../styles/images/delete_img.svg';
import CloseIcon from '@material-ui/icons/Close';
import ErrorPopup from '../../components/ErrorPopup/ErrorPopup';
import ImageUploading from 'react-images-uploading';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import paths from '../../utils/routing';
import './DashBoard.scss';

function DashBoard() {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [openEdit, setOpenEdit] = useState(null);
    const [foldersNames, setFoldersNames] = useState([]);
    const [isFolderNameCreated, setIsFolderNameCreated] = useState(false);
    const [toggleAddImages, setToggleAddImages] = useState(false);
    const [deleteToggle, setDeleteToggle] = useState(null);
    const [editFolderName, setEditFolderName] = useState('');
    const [togglePopup, setTogglePopup] = useState(false);
    const [imagesArray, setImagesArray] = useState([]);
    const [newImagesArray, setNewImagesArray] = useState([]);
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_URL;

    const [elementToEdit, setElementToEdit] = useState('');
    const [elementToDelete, setElementToDelete] = useState('');
    const [elementToAdd, setElementToAdd] = useState('');

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const history = useHistory();
    const maxlimit = 10;

    const showMenu = toggleMenu ? 'show__menu' : 'hide__menu';

    useEffect(() => {
        fetch(`${apiUrl}get-folders`, {
            method: 'GET',
            headers: {
                "x-access-token": token
            }
        })
            .then(response => {
                if (response.status === 403) {
                    localStorage.removeItem('token');
                    history.push(paths.Main)
                }
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
            .then((res) => {
                if (res.status === 'fail' && res.message === 'Token is invalid') {
                    localStorage.removeItem('token');
                    history.push(paths.Main)
                }
                isAddData && handleAddImages();
                if (res.status === 'success') {
                    handleAddImages();
                    history.push({ pathname: paths.Desktop, state: { folderName: data.folder_name } });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const addImages = (el) => {
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

    const editFileName = (data) => {
        fetch(`${apiUrl}rename-folder`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                "x-access-token": token,
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then((response) => {
                if (response.status === 'fail') {
                    handleEditToggle(false)
                }
                if (response.status === 'fail' && response.message === 'Token is invalid') {
                    localStorage.removeItem('token');
                    history.push(paths.Main)
                }
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
            .then((response) => {
                if (response.status === 'fail' && response.message === 'Token is invalid') {
                    localStorage.removeItem('token');
                    history.push(paths.Main)
                }
                toggleDelete();
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        // setElementToDelete('')
    }

    const handleEditCreate = (el) => {
        editFolderName && setOpenEdit(false);
        const data = {
            folder_name: el,
            new_folder_name: editFolderName,
        }
        foldersNames.includes(editFolderName)
            ? setTogglePopup(togglePopup)
            : setFoldersNames(prev => prev.map(i => i === el ? editFolderName : i))
        editFileName(data);
    }

    const onChange = (imageList) => {
        setImagesArray(imageList);
        setNewImagesArray(imageList);
    };

    const handleCloseAddImage = () => {
        setImagesArray([]);
        setNewImagesArray([]);
        setToggleAddImages(!toggleAddImages);
    }

    const handleAddImages = (el = null) => {
        setToggleAddImages(!toggleAddImages);
    }

    const handleEditToggle = (el) => {
        setOpenEdit(!openEdit);
        setEditFolderName(el);
    }
    const toggleDelete = (el = null) => {
        setDeleteToggle(el);
    }

    const handleToggle = (data) => {
        setToggleMenu(data)
    }
    // const chooseBtn = { ...styles.chooseButton, ...styles.Button };
    return (
        <>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                <div className={`profile_container ${showMenu}`}>
                    <UserHeader handleToggle={handleToggle} showBurger={toggleMenu} />
                    <div className='dashboard__import__new__data__btn__wrapper'>
                        <div className='dashboard__import__new__data__btn'>
                            <UploadBtnImg />
                            Import new data
                        </div>
                    </div>
                    <div className='dashboard__header'>
                        <hr className='dashboard__first__line' />
                        <span>imported data</span>
                        <hr className='dashboard__second__line' />
                    </div>
                    <div className='dashboard__content__wrapper'>
                        {foldersNames.map((el, index) => (
                            <>
                                <div className='dashboard__row' key={index}>
                                    <div
                                        className='file__name__box'
                                        onClick={() => history.push({ pathname: paths.Desktop, state: { folderName: el } })}
                                    >
                                        {((el).length > maxlimit) ?
                                            (((el).substring(0, maxlimit - 3)) + '...') :
                                            el}
                                    </div>
                                    <div>
                                        <AddImg
                                            className='dashboard__add__img'
                                            onClick={() => {
                                                setElementToAdd(el)
                                                handleAddImages(el)
                                            }} />
                                        <EditImg
                                            className='dashboard__edit__img'
                                            onClick={() => {
                                                setElementToEdit(el)
                                                handleEditToggle(el)
                                            }} />
                                        <DeleteImg
                                            className='dashboard__delete__img'
                                            onClick={() => {
                                                setElementToDelete(el)
                                                toggleDelete(el)
                                            }} />
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
                {toggleMenu && <CustomMenu handleToggle={handleToggle} />}

                {/* add image mmodal */}
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
                        Upload images to chosen folder
                    </DialogTitle>
                    <ImageUploading
                        multiple
                        value={newImagesArray}
                        onChange={onChange}
                        acceptType={['jpg', 'jpeg', 'png']}
                        maxFileSize={100000}
                        resolutionType="less"
                        resolutionWidth={1024}
                        resolutionHeight={1024}
                        dataURLKey="data_url"
                    >
                        {({
                            onImageUpload,
                            errors,
                        }) => (
                            <span>
                                <button
                                    className='choose-button'
                                    color="primary"
                                    onClick={onImageUpload}
                                >
                                    Choose photo
                                </button>
                                {newImagesArray.length !== 0 && <div>{`YOU CHOOSED ${newImagesArray.length} PHOTOS`}</div>}
                                {errors && <div>
                                    {errors.maxFileSize && <div> Maxfile size error </div>}
                                    {errors.maxNumber && <div>MAX number error</div>}
                                    {errors.resolution && <div>Resolution error</div>}
                                </div>}
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
                        // style={cancelBtn}
                        onClick={handleCloseAddImage}
                        color="primary"
                    >
                        Cancel
                    </button>
                </Dialog>

                {/* edit modal */}
                <Dialog
                    PaperProps={{
                        style: {
                            borderRadius: '25px',
                            background: '#FFFFFF',
                            border: '3px solid #257AAF'
                        }
                    }}
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
                                pattern="^([a-zA-Z]*[a-zA-Z1-9]_?-?[a-zA-Z1-9]*)$"
                                minlength="3"
                                maxlength="15"
                                title="Folder name should contain letter and numbers. Words can be seperated by - or _ "
                                required
                                validationErrors={{
                                    isDefaultRequiredValue: 'Field is required'
                                }}
                            />
                        </DialogContent>
                        {<ErrorPopup togglePopup={togglePopup} togglePopupf={setTogglePopup} errMsg={'Please choose photo'} />}
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
                                Cancel
                            </button>
                        </DialogActions>
                    </>
                </Dialog>

                {/* delete modal */}
                <Dialog
                    PaperProps={{
                        style: {
                            width: '522px',
                            height: '227px',
                            borderRadius: '13px',
                            background: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }
                    }}
                    className='delete__dialog'
                    open={!!deleteToggle}
                >
                    <div className='delete__dialog__content__wrapper'>
                        <DialogContent className='delete__dialog__content'>
                            {'Are you sure you want to '}
                            <b>delete</b>
                            {' file '}
                            <span style={{ color: '#8924BF' }}>{`${elementToDelete}`}</span>
                            <br />
                            The process is eirrevertable.
                        </DialogContent>
                        <DialogActions>
                            <button
                                className='delete__dialog__button'
                                onClick={() => {
                                    deleteFile(elementToDelete);
                                    let newArr = foldersNames.filter((el) => el !== elementToDelete);
                                    newArr.length ?
                                        setFoldersNames(foldersNames.filter((el) => el !== elementToDelete))
                                        :
                                        history.push(paths.NewImportData)
                                    // setElementToDelete('')
                                }}
                                color="primary"
                            >
                                Yes, delete
                            </button>
                            <div
                                className='cancel__dialog__btn'
                                onClick={() => toggleDelete()}
                                color="primary"
                            >
                                Cancel
                            </div>
                        </DialogActions>
                    </div>
                </Dialog>
            </div>
        </>
    )
}
export default DashBoard;