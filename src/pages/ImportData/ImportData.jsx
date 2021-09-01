import React from 'react';
import { useState } from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import './ImportData.scss';

function ImportData(props) {
    const [open, setOpen] = useState(false);
    const [folderName, setFolderName] = useState('')
    const handleOpen = () => {
        setOpen(true);
        setFolderName('');
    }
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <UserHeader />
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
                <div>
                    {folderName
                        && (<div>
                            <FolderOpenIcon />
                                {folderName}
                            <AddIcon />
                            <EditIcon />
                            <HighlightOffIcon />
                        </div>)
                    }
                </div>
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
        </>
    )
}

export default ImportData;