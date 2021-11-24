import { useState, useEffect } from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import LeftBar from '../../components/LeftBar/LeftBar';
import RightBar from '../../components/RightBar/RightBar'
import AnotationTool from '../../components/AnotationTool/AnotationTool';
import './Desktop.scss';
import paths from '../../utils/routing';

require('dotenv').config();

function Desktop(props) {
    const apiUrl = process.env.REACT_APP_API_URL;
    const folderName = props.match.url.slice(paths.Desktop.length);
    useEffect(() => {
        console.log('foldername DESKTOP: ', folderName.length);
        fetch(`${apiUrl}get-annotation-images?folder_name=${folderName}`, {
            method: 'POST',
            headers: {
                "x-access-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ "image_interval": 1 })
        })
            .then(response => {
                return response.json();
            })
            .then(res => {
                console.log('res-------------', res)
                setImagesList(res.message);
            })
            .catch((err) => {
                console.log('err: ', err);
            })
    }, [])

    const [imagesList, setImagesList] = useState([]);
    const [isRotationAllowed, setIsRotationAllowed] = useState(false)
    const [notes, setNotes] = useState({})

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
                />
                <div className='main-photo'>
                    <AnotationTool
                        image={imagesList[0]}
                        isRotationAllowed={isRotationAllowed}
                        setNotes={setNotes}
                    />
                </div>
                <RightBar notes={notes} />
            </div>
        </div>
    )
}

export default Desktop;