import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom'

import UserHeader from '../../components/UserHeader/UserHeader';
import LeftBar from '../../components/LeftBar/LeftBar';
import RightBar from '../../components/RightBar/RightBar';
import AnotationTool from '../../components/AnotationTool/AnotationTool';
import defMarks from '../../components/AnotationTool/marks.json';
import Loader from '../../components/Loader/Loader';
import CircularUnderLoad from '../../components/Loader/Loader';

import './Desktop.scss';

import paths from '../../utils/routing';
require('dotenv').config();


function Desktop() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const history = useHistory();
    const { state } = useLocation();
    const { folderName } = state;

    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [imagesList, setImagesList] = useState([]);
    const [isRotationAllowed, setIsRotationAllowed] = useState(false)
    const [notes, setNotes] = useState({})
    const [imageIndex, setImageIndex] = useState(0)
    const [marks, setMarks] = useState(defMarks[0])

    useEffect(() => {
        setLoading(true);
        state === undefined ? history.push(paths.Importdata)
            : fetch(`${apiUrl}get-annotation-images?folder_name=${folderName}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    "x-access-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ image_interval: 1 })
            })
                .then(response => {
                    return response.json();
                })
                .then(res => {
                    if (res.status !== 'fail') {
                        setImagesList(res.message);
                    } else {
                        history.push(paths.Importdata)
                    }
                    setIsLoading(false);
                })
                .catch((err) => {
                    setError(err)
                    console.log('err: ', err);
                })
                .finally(() => setLoading(false))
    }, [])


    const detectOnSingleImage = () => {
        setLoading(true)
        fetch(`${apiUrl}detect-on-single-image/${isRotationAllowed ? 'rbb' : 'bb'}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                "x-access-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ folder_name: folderName, img_index: imageIndex })
        })
            .then(res => {
                return res.json()
            })
            .then(res => {
                console.log(`res`, res)
                if (res.status === 'fail') throw new Error(res.message)
                setMarks(res.message)
            })
            .catch(e => {
                setError(e)
                console.error(e)
            })
            .finally(() => setLoading(false))
    }

    if (loading) return <CircularUnderLoad />

    return (
        <>
            {isLoading ? <Loader /> : <div className='comp-desktop'>
                <UserHeader className='user_header_desktop' />
                <div className='main-content-container'>
                    <LeftBar className='left_bar'
                        imagesList={imagesList}
                        setImagesList={setImagesList}
                        isRotationAllowed={isRotationAllowed}
                        setNotes={setNotes}
                        marks={marks}
                        folderName={folderName}
                        imageIndex={imageIndex}
                        setIsRotationAllowed={setIsRotationAllowed}
                        setImageIndex={setImageIndex}
                    />
                    <div className='main-photo'>
                        <AnotationTool
                            image={imagesList[imageIndex]}
                            isRotationAllowed={isRotationAllowed}
                            setNotes={setNotes}
                            marks={marks}
                            folderName={folderName}
                            imageIndex={imageIndex}
                        />
                    </div>
                    <RightBar detectOnSingleImage={detectOnSingleImage} notes={notes} />
                </div>
            </div>
            }
        </>
    )
}

export default Desktop;