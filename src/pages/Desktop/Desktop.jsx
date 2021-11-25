import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import UserHeader from '../../components/UserHeader/UserHeader';
import LeftBar from '../../components/LeftBar/LeftBar';
import RightBar from '../../components/RightBar/RightBar'
import AnotationTool from '../../components/AnotationTool/AnotationTool';
import defMarks from '../../components/AnotationTool/marks.json'
import { useLocation } from 'react-router-dom'
import './Desktop.scss';
import paths from '../../utils/routing';
require('dotenv').config();

function Desktop() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const history = useHistory();
    const { state } = useLocation();
    const { folderName } = state;

    useEffect(() => {
        state === undefined ? history.push(paths.Importdata) //maybe add loader
            :
            fetch(`${apiUrl}get-annotation-images?folder_name=${folderName}`, {
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
                        // throw new Error(res.message)
                    }
                })
                .catch((err) => {
                    console.log('err: ', err);
                })
    }, [])

    const [imagesList, setImagesList] = useState([{
        image: 'lr_animal133.jpg',
        label: 'Animal'
    }]);
    const [isRotationAllowed, setIsRotationAllowed] = useState(false)
    const [notes, setNotes] = useState({})
    const [imageIndex, setImageIndex] = useState(0)
    const [marks, setMarks] = useState(defMarks[0])

    const detectOnSingleImage = () => {
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
                console.error(e)
            })
    }

    return (
        <div className='comp-desktop'>
            <UserHeader className='user_header_desktop' />
            <div className='main-content-container'>
                <LeftBar className='left_bar'
                    imagesList={imagesList}
                    setImagesList={setImagesList}
                    isRotationAllowed={isRotationAllowed}
                    setIsRotationAllowed={setIsRotationAllowed}
                    folderName={folderName}
                    setImageIndex={setImageIndex}
                />
                <div className='main-photo'>
                    <AnotationTool
                        image={imagesList[imageIndex]}
                        isRotationAllowed={isRotationAllowed}
                        setNotes={setNotes}
                        marks={marks}
                    />
                </div>
                <RightBar detectOnSingleImage={detectOnSingleImage} notes={notes} />
            </div>
        </div>
    )
}

export default Desktop;